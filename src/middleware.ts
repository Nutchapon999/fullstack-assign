import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "../routes";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: Session | null }): Response | void => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Check if the requested route is a public route
  const isPublicRoute = publicRoutes.some(route => {
    const regexPath = route.replace(/:\w+/g, '[^/]+').replace(/\*/g, '.*');
    const dynamicRouteRegex = new RegExp(`^${regexPath}$`);
    return dynamicRouteRegex.test(nextUrl.pathname);
  });

  console.log('Request Path:', nextUrl.pathname);
  console.log('Is Logged In:', isLoggedIn);
  console.log('Is Public Route:', isPublicRoute);

  if (isApiAuthRoute) {
    return; // Allow API auth routes without redirection
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return; // Allow access to auth routes if not logged in
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return; // Allow access if it's a public route or the user is logged in
});

// Don't invoke Middleware on certain paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"], // Match all routes except files and API
};
