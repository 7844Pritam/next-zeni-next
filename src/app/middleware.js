import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin-auth';
const ADMIN_PASSWORD = 'supersecret123'; // Hardcoded password (replace with your own)

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!authCookie || authCookie !== ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};