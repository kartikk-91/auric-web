import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,

      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: {
          scope: "read:user user:email",
        },
      },

      async profile(profile, tokens) {
        let email = profile.email;

        if (!email && tokens?.access_token) {
          const res = await fetch(
            "https://api.github.com/user/emails",
            {
              headers: {
                Authorization: `token ${tokens.access_token}`,
                Accept: "application/vnd.github+json",
              },
            }
          );

          if (res.ok) {
            const emails: {
              email: string;
              primary: boolean;
              verified: boolean;
            }[] = await res.json();

            const primary = emails.find(
              (e) => e.primary && e.verified
            );

            email = primary?.email ?? null;
          }
        }

        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email:
            email ??
            `${profile.login}.github@local.com`,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      async authorize(credentials) {
        const validatedFields =
          LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } =
          validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.hashedPassword) {
          return null;
        }

        const passwordMatch =
          await bcrypt.compare(
            password,
            user.hashedPassword
          );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.u_id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;