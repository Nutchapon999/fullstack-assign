import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { and, desc, eq, sql } from "drizzle-orm";
import { comments, posts, users } from "@/db/schema";

import { Communities } from "@/features/post/types";
import { PostSchema } from "@/features/post/schema";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        search: z.string().optional(),
        community: z.string().optional(),
      })
    ),
    async (c) => {
      const { community, search } = c.req.valid("query");

      const searchTerm = search && search.trim().length >= 2 ? `%${search.trim().toLowerCase()}%` : null;

      const conditions = [];
    
      if (community) {
        conditions.push(eq(posts.community, community as Communities));
      }

      if (searchTerm) {
        conditions.push(sql`LOWER(${posts.title}) LIKE ${searchTerm}`);
      }

      const query = db
        .select()
        .from(posts)
        .leftJoin(users, eq(users.id, posts.userId))
        .leftJoin(comments, eq(comments.postId, posts.id))
        .where(and(...conditions))
        .orderBy(desc(posts.createdAt));

      const data = await query;

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