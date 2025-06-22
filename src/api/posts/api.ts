import { Post } from '@prisma/client';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw new Error('Failed to get posts');
  }
}
