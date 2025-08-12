import type { Post } from '@prisma/client';

import type { Navigation } from '@/components/post/post-navigation';
import prisma from '@/db/client';

export async function findPosts(tags?: string[]): Promise<Post[]> {
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

export async function findPostByIdWithNavigation(id: number): Promise<{ post: Post | null; navigation: Navigation }> {
  const post = await prisma.post.findUnique({ where: { id } });
  const posts = await prisma.post.findMany({ select: { id: true, title: true }, orderBy: { id: 'desc' } });
  const idx = posts.findIndex((post) => post.id === id);

  const navigation = {
    prev: posts[idx + 1] ? { id: posts[idx + 1].id, title: posts[idx + 1].title } : null,
    next: posts[idx - 1] ? { id: posts[idx - 1].id, title: posts[idx - 1].title } : null,
  };

  return { post, navigation };
}

export async function updatePost(data: Omit<Post, 'createdAt' | 'updatedAt'>) {
  await prisma.post.update({ where: { id: data.id }, data });
}
