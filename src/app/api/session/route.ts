import { NextResponse } from 'next/server';

import getSession from '@/lib/session';

export async function GET() {
  const session = await getSession();

  if (session?.id) {
    return NextResponse.json({ isLogin: true });
  } else {
    return NextResponse.json({ isLogin: false });
  }
}
