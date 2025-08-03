import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');

  if (accessToken) {
    return NextResponse.json({ isLogin: true });
  } else {
    return NextResponse.json({ isLogin: false });
  }
}
