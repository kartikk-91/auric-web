import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { getUserById, getUserByEmail } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // OAuth providers
      if (
        account?.provider === "google" ||
        account?.provider === "github"
      ) {
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? "",
              isVerified: true,
            },
          });
        }

        return true;
      }

      // Credentials provider
      if (account?.provider === "credentials") {
        if (!user.id) return false;

        const existingUser = await getUserById(user.id);

        if (!existingUser) return false;

        if (!existingUser.isVerified) {
          return false;
        }

        return true;
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.email) return token;

      const user = await getUserByEmail(token.email);

      if (!user) return token;

      // IMPORTANT
      token.sub = user.u_id;

      const company = await prisma.company.findFirst({
        where: {
          u_id: user.u_id,
        },
        select: {
          c_id: true,
        },
      });

      token.c_id = company?.c_id;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.c_id = token.c_id as string | undefined;
      }

      delete (session.user as typeof session.user & { image?: string })
        ?.image;

      return session;
    },
  },

  ...authConfig,
});