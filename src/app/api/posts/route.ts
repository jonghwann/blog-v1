import { NextResponse } from 'next/server';

import { findPosts } from '@/lib/db/posts';

export async function GET() {
  try {
    const posts = await findPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Failed to find posts' }, { status: 500 });
  }
}
