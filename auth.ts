import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const DEMO_EMAIL = "demo@mythosatlas.app";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // JWT strategy is required for Credentials provider to work alongside
  // the Prisma adapter. OAuth users/accounts are still stored in the DB;
  // only sessions move from the DB into a signed cookie.
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      id: "demo",
      name: "Demo",
      credentials: {},
      async authorize() {
        const user = await prisma.user.findUnique({
          where: { email: DEMO_EMAIL },
        });
        if (!user) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    // Runs on every sign-in — puts the DB user id into the JWT
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    // Runs on every session read — exposes the id to the app
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
});