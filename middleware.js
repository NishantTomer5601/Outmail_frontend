import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /dashboard, /about, etc.)
  const path = request.nextUrl.pathname;

  // Only protect /dashboard route
  if (path.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('outmail_auth') || 
                      request.cookies.get('connect.sid') || 
                      request.cookies.get('sessionId') || 
                      request.cookies.get('auth-token') ||
                      request.cookies.get('session');
    if (!authCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Directly allow /dashboard
    return NextResponse.next();
  }
  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};