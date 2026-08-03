import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

        const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";

        if (!email || !password || !adminEmail || !passwordHash) {
          return null;
        }

        if (email !== adminEmail) {
          return null;
        }

        const valid = await bcrypt.compare(password, passwordHash);
        if (!valid) return null;

        return {
          id: "admin",
          email: adminEmail,
          name: "Администратор",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
