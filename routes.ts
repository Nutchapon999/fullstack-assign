export const publicRoutes = [
  "/",
  "/posts/:id",
  "/:path*",
];

export const authRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";