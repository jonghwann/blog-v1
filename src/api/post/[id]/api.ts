import { Post } from '@prisma/client';

export async function getPost(id: string): Promise<Post> {
  'use cache';
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: 'force-cache',
  });

  const data = await response.json();
  return data;
}
