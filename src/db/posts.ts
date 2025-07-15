import { type Post } from '@prisma/client';

import prisma from '@/db/client';

export async function findPosts(tag?: string | string[]): Promise<Post[]> {
  let tags;

  if (typeof tag === 'string') {
    tags = [tag];
  } else if (Array.isArray(tag)) {
    tags = tag;
  }

  if (tags && tags.length > 0) {
    return await prisma.post.findMany({
      where: { OR: tags.map((tag) => ({ tags: { contains: tag } })) },
      orderBy: { createdAt: 'desc' },
    });
  } else {
    return await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  }
}

export async function findTags(): Promise<{ tags: string }[]> {
  return await prisma.post.findMany({ select: { tags: true } });
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
