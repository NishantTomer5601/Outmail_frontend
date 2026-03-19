import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /dashboard, /about, etc.)
  const path = request.nextUrl.pathname;
  const tokenFromQuery = request.nextUrl.searchParams.get('token');

  // Legacy dashboard should always route through auth success,
  // so role-based redirect logic can run on the client.
  if (path === '/dashboard') {
    const redirectUrl = new URL('/auth/success', request.url);
    if (tokenFromQuery) {
      redirectUrl.searchParams.set('token', tokenFromQuery);
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Define paths that should be protected
  const protectedPaths = [
    '/dashboard', // Legacy dashboard - redirect to role-based
    '/student', 
    '/admin'
  ];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // If it's a protected path, check for authentication
  if (isProtectedPath) {
    // Get the auth cookie (updated for role-based backend)
    const authCookie = request.cookies.get('outmail_auth') || 
                      request.cookies.get('connect.sid') || 
                      request.cookies.get('sessionId') || 
                      request.cookies.get('auth-token') ||
                      request.cookies.get('session');
    
    // If no auth cookie, redirect to home
    if (!authCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // For auth success page, allow through
  if (path === '/auth/success') {
    return NextResponse.next();
  }

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