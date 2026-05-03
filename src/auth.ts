import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/db"
import { getUserById } from "./data/user"



export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { u_id: user.id },
        data: { isVerified: true }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {

      if (user.image) delete user.image;

      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.isVerified) {
        return false;
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.c_id = token.c_id as string;
      }

      type SessionUser = typeof session.user & { image?: string };
      delete (session.user as SessionUser).image;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const company = await prisma.company.findFirst({
        where: { u_id: token.sub },
        select: { c_id: true },
      });

      if (company) {
        token.c_id = company.c_id;
      }

      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})