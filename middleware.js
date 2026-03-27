import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams.toString();
  const query = searchParams ? `?${searchParams}` : "";

  // 1. Identification
  const authCookie =
    request.cookies.get("outmail_auth") ||
    request.cookies.get("connect.sid") ||
    request.cookies.get("sessionId") ||
    request.cookies.get("auth-token") ||
    request.cookies.get("session");

  const urlToken = request.nextUrl.searchParams.get("token");
  const isAuthenticated = !!(authCookie || urlToken);

  // 2. Protected Routes (Must be logged in)
  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Auth Routes (Only for guest)
  const authRoutes = ["/app-login", "/auth"];
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // If user is already authenticated, don't show login pages
  // Except for /auth/success which is a transient state
  if (isAuthRoute && isAuthenticated && !path.startsWith("/auth/success")) {
    return NextResponse.redirect(new URL(`/dashboard${query}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
