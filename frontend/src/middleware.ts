import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protected paths
  const protectedPaths = ['/dashboard'];
  const authPaths = ['/login', '/register'];

  // If trying to access protected path without token
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access auth path with token
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next|_static|.*\\..*|_vercel).*)',
  ],
};