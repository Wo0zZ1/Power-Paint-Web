import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

export const AUTH_CONFIG = {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // TODO Switch to DB strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session({ session, token }) {
      const newSession = structuredClone(session) as typeof session & {
        user: { id: string };
      };

      if (newSession?.user && token?.sub) newSession.user.id = token.sub;

      return newSession;
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/dashboard", nextUrl));
    //   }
    //   return true;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
