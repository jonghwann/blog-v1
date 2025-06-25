import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import getSession from './lib/session';

const protectedPaths = ['/posts/write', '/posts/edit/:path*'];

export async function middleware(request: NextRequest) {
  const { id } = await getSession();

  if (id && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }

  if (!id && protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }
}

export const config = {
  matcher: ['/login', '/posts/write', '/posts/edit/:path*'],
};
