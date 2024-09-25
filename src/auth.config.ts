import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { SignInSchema } from "@/features/auth/schema";

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", value: "username" },
      },
      async authorize(credentials) {
        const validatedField = SignInSchema.safeParse(credentials);

        if (!validatedField.success) return null;

        const { username } = validatedField.data;

        const [existingUser] = await db
          .select()
          .from(users)
          .where(eq(users.name, username))

        if (!existingUser) return null;

        return existingUser
      }
    }),
  ],
} satisfies NextAuthConfig;