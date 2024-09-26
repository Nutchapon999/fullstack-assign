import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verifyAuth } from "@hono/auth-js";

import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";
import { comments, commentsInsertSchema, users } from "@/db/schema";

const app = new Hono()
  .get(
    "/:postId",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    zValidator(
      "param",
      z.object({
        postId: z.string(),
      })
    ),
    async (c) => {
      const { postId } = c.req.valid("param");
      const { limit, page } = c.req.valid("query");

      if (!postId) {
        return c.json({ error: "Missing post id" }, 400);
      }

      const data = await db
        .select({
          id: comments.id,
          message: comments.message,
          user: users.name,
          createdAt: comments.createdAt,
        })
        .from(comments)
        .leftJoin(users, eq(users.id, comments.userId))
        .limit(limit)
        .offset((page - 1) * limit)
        .where(eq(comments.postId, postId))
        .orderBy(desc(comments.createdAt))

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ 
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      commentsInsertSchema.pick({
        postId: true,
        message: true,
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { message, postId } = c.req.valid("json");

      if (!auth || !auth.token?.sub) {
        return c.json({ error: "Unauthorized"}, 401);
      }

      await db
        .insert(comments)
        .values({
          message,
          postId,
          userId: auth.token.sub,
        })

      return c.json(null, 200);
    } 
  )

export default app;