import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = user.id;
        // @ts-ignore
        session.user.role = (user as any).role || 'member';
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
