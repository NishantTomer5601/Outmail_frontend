import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;
  const searchParams = request.nextUrl.searchParams.toString();
  const query = searchParams ? `?${searchParams}` : "";

  const authCookie =
    request.cookies.get("outmail_auth") ||
    request.cookies.get("connect.sid") ||
    request.cookies.get("sessionId") ||
    request.cookies.get("auth-token") ||
    request.cookies.get("session");

  const urlToken = request.nextUrl.searchParams.get("token");
  const isAuthenticated = !!(authCookie || urlToken);

  const alwaysPublicPaths = [
    "/terms-and-conditions",
    "/privacy-policy",
    "/auth/success",
  ];
  if (alwaysPublicPaths.includes(path)) {
    return NextResponse.next();
  }

  const authRoutes = ["/app-login", "/auth"];
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(`/dashboard${query}`, origin));
    }
    return NextResponse.next();
  }

  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  const tpoPublicRoutes = ["/tpo/login", "/tpo/register"];
  const isTpoPublicRoute = tpoPublicRoutes.includes(path);

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (path.startsWith("/tpo") && !isTpoPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
