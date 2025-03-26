import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the exact path of the request
  const path = request.nextUrl.pathname;

  const isAuthPath = path === '/login' || path === '/register' || path === '/recover-password' || path === '/reset-password';
  
  const token = request.cookies.get('authToken')?.value;
  const hasCompletedTest = request.cookies.get('testCompleted')?.value === 'true';

  // Check if we're on the test page (exact match)
  const isTestPage = path === '/test' || path === '/test/';
  
  console.log({
    path,
    token,
    hasCompletedTest,
    isTestPage,
    isAuthPath
  });

  if (!token && isAuthPath === false) {
    console.log('Redirecting to login: No auth token on protected path');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && hasCompletedTest === false && isTestPage === false) {
    console.log('Redirecting to test: User has not completed test');
    return NextResponse.redirect(new URL('/test', request.url));
  }

  if (token && hasCompletedTest && isTestPage) {
    console.log('Redirecting to dashboard: User already completed test');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. All files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|.*\\..*|_vercel).*)',
  ],
}; 