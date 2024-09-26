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
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const { community, search, limit, page } = c.req.valid("query");

      const searchTerm = search && search.trim().length >= 2 ? `%${search.trim().toLowerCase()}%` : null;

      const conditions = [];
    
      if (community) {
        conditions.push(eq(posts.community, community as Communities));
      }

      if (searchTerm) {
        conditions.push(sql`LOWER(${posts.title}) LIKE ${searchTerm}`);
      }

      const data = await db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          community: posts.community,
          userId: posts.userId,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          userName: users.name,
          commentCount: sql<number>`COUNT(DISTINCT ${comments.id})`.as('commentCount'),
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .leftJoin(comments, eq(posts.id, comments.postId))
        .groupBy(
          posts.id,
          posts.title,
          posts.description,
          posts.community,
          posts.userId,
          posts.createdAt,
          posts.updatedAt,
          users.name
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .where(and(...conditions))
        .orderBy(desc(posts.createdAt));

      return c.json({ 
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          community: posts.community,
          userId: posts.userId,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          userName: users.name,
          commentCount: sql<number>`COUNT(DISTINCT ${comments.id})`.as('commentCount'),
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .leftJoin(comments, eq(comments.postId, id))
        .groupBy(
          posts.id,
          posts.title,
          posts.description,
          posts.community,
          posts.userId,
          posts.createdAt,
          posts.updatedAt,
          users.name
        )
        .where(eq(posts.id , id))

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .get(
    "/our/:userId",
    verifyAuth(),  
    zValidator(
      "param",
      z.object({
        userId: z.string(),
      })
    ),
    zValidator(
      "query",
      z.object({
        search: z.string().optional(),
        community: z.string().optional(),
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { userId } = c.req.valid("param");
      const { community, search, limit, page } = c.req.valid("query");
      
      if (!auth || !auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!userId) {
        return c.json({ error: "Missing user id" }, 400);
      }

      const searchTerm = search && search.trim().length >= 2 ? `%${search.trim().toLowerCase()}%` : null;

      const conditions = [
        eq(posts.userId, userId)
      ];
    
      if (community) {
        conditions.push(eq(posts.community, community as Communities));
      }

      if (searchTerm) {
        conditions.push(sql`LOWER(${posts.title}) LIKE ${searchTerm}`);
      }

      const data = await db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          community: posts.community,
          userId: posts.userId,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          userName: users.name,
          commentCount: sql<number>`COUNT(DISTINCT ${comments.id})`.as('commentCount'),
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .leftJoin(comments, eq(comments.postId, posts.id))
        .groupBy(
          posts.id,
          posts.title,
          posts.description,
          posts.community,
          posts.userId,
          posts.createdAt,
          posts.updatedAt,
          users.name
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .where(and(...conditions))
        .orderBy(desc(posts.createdAt))

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
      PostSchema
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { title, community, description } = c.req.valid("json");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (community === undefined) {
        return c.json({ error: "Community is required" }, 400);
      }

      await db
        .insert(posts)
        .values({
          title,
          community,
          description,
          userId: auth.token.sub,
        });

      return c.json(null, 200);
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      PostSchema
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const value = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(posts)
        .set({
          ...value
        })
        .where(eq(posts.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .delete(posts)
        .where(eq(posts.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data });
    }
  )

export default app;