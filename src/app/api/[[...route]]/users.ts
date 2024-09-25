import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { SignInSchema } from "@/features/auth/schema";

export const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      SignInSchema,
    ),
    async (c) => {
      const { username } = c.req.valid("json");

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.name, username))

      if (existingUser) {
        return c.json({ error: "Username already in use" }, 400);
      }

      await db
        .insert(users)
        .values({
          name: username
        })

      return c.json(null, 200);
    }
  )

export default app;