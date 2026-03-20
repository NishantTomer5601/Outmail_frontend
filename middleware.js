import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /dashboard, /about, etc.)
  const path = request.nextUrl.pathname;

  // NOTE:
  // Do not enforce cookie-only auth for /student or /admin here.
  // This app supports token-based auth in localStorage as well,
  // which middleware cannot read. Route protection is handled in AuthGuard.

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};