import { type Post } from '@prisma/client';

import prisma from '@/db/client';

export async function findPosts(): Promise<Post[]> {
  return await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: number }> {
  return await prisma.post.create({ data, select: { id: true } });
}

export async function findPostById(id: number): Promise<Post | null> {
  return await prisma.post.findUnique({ where: { id } });
}

export async function updatePost(data: Omit<Post, 'createdAt' | 'updatedAt'>) {
  await prisma.post.update({ where: { id: data.id }, data });
}
