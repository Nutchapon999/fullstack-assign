import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import authConfig from "./auth.config";


export const { 
  auth, 
  handlers,
  signIn, 
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, token.sub));
        
        if (user) {
          session.user.id = user.id;
          session.user.name = user.name;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub));

      if (!existingUser) return token;
      
      token.name = existingUser.name;

      return token;
    }
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})