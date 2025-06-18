import { Post } from '@prisma/client';

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    next: {
      tags: [`post-${id}`],
    },
  });

  const data = await response.json();
  return data;
}
