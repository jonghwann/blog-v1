import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const guestPaths = ['/login'];
const protectedPaths = ['/posts/write', '/posts/edit/:path*'];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');

  if (accessToken && guestPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }

  if (!accessToken && protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }
}

export const config = {
  matcher: ['/login', '/posts/write', '/posts/edit/:path*'],
};
