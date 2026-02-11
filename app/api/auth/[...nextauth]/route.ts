import NextAuth from "next-auth";

import { AUTH_CONFIG } from "@/shared/config";

const handler = NextAuth(AUTH_CONFIG);

export { handler as GET, handler as POST };
