'use server';

import { redirect } from 'next/navigation';

import { PrismaClient } from '@prisma/client';

import { highlightCodeBlocks, addHeadingIds } from '@/lib/post';

const prisma = new PrismaClient();

export async function writeAction(formData: FormData) {
  let content = formData.get('content')?.toString() ?? '';
  content = highlightCodeBlocks(content);
  content = addHeadingIds(content);

  const summary = content.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

  const data = {
    title: formData.get('title')?.toString() ?? '',
    content: content,
    summary: summary,
    tags: formData.get('tags')?.toString().split(',').filter(Boolean).sort().join(',') ?? '',
  };

  const post = await prisma.post.create({ data, select: { id: true } });
  redirect(`/posts/${post.id}`);
}
