import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { desc, eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { comments, posts, users } from "@/db/schema";

import { PostSchema } from "@/features/post/schema";

const app = new Hono()
  .get(
    "/",
    async (c) => {
      const data = await db
        .select()
        .from(posts)
        .leftJoin(users, eq(users.id, posts.userId))
        .leftJoin(comments, eq(comments.postId, posts.id))
        .orderBy(desc(posts.createdAt))

      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      PostSchema
    ),
    async (c) => {
      const auth = c.get("authUser");

      const value = c.req.valid("json");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      await db
        .insert(posts)
        .values({
          ...value,
          userId: auth.token.sub,
        });

      return c.json(null, 200);
    }
  )

export default app;