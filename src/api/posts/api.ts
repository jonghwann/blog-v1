import { Post } from '@prisma/client';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw new Error('Failed to get posts');
  }
}
