import { Post } from '@prisma/client';

import prisma from '@/lib/db';

export async function findPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
    return posts;
  } catch (error) {
    console.error('Error in findPosts:', error);
    throw new Error('Failed to find posts');
  }
}

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: number }> {
  try {
    const post = await prisma.post.create({ data, select: { id: true } });
    return post;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw new Error('Failed to create post');
  }
}

export async function findPostById(id: number): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    return post;
  } catch (error) {
    console.error('Error in findPostById:', error);
    throw new Error('Failed to find post by id');
  }
}
