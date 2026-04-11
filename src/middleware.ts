import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // Already logged in → skip the auth page, go straight to dashboard
  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Not logged in → redirect to auth
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth', '/dashboard/:path*'],
};
