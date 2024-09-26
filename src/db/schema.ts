import {
  pgEnum,
  pgTable,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
});

export const communities = pgEnum("communities", ["History", "Food", "Pets", "Health", "Fashion", "Exercise", "Others"])

export const posts = pgTable("post", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  community: communities("community").notNull(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$onUpdate(() => new Date()).notNull(),
});

export const comments = pgTable("comment", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  message: text("message").notNull(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
  postId: text("postId").references(() => posts.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).$onUpdate(() => new Date()).notNull(),
});

export const commentsInsertSchema = createInsertSchema(comments);