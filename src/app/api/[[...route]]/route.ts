import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import authConfig from "@/auth.config";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";

import users from "./users";
import posts from "./posts";

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: process.env.AUTH_SECRET,
    ...authConfig,
  }
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/users", users)
  .route("/posts", posts)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;