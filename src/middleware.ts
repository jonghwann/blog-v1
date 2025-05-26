import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import getSession from './lib/session';

export async function middleware(request: NextRequest) {
  const { id } = await getSession();

  if (id && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }

  if (!id && request.nextUrl.pathname.startsWith('/posts/write')) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }
}

export const config = {
  matcher: ['/login', '/posts/write'],
};
