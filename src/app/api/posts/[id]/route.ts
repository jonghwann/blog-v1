import { NextResponse } from 'next/server';

import { findPostById } from '@/lib/db/posts';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const post = await findPostById(Number(id));
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Failed to find post' }, { status: 500 });
  }
}
