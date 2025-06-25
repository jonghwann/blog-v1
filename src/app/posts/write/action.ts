'use server';

import { redirect } from 'next/navigation';

import { highlightCodeBlocks, addHeadingIds } from '@/lib/post';
import { createPost } from '@/db/posts';

export async function writeAction(formData: FormData) {
  let content = formData.get('content')?.toString() ?? '';
  content = highlightCodeBlocks(content);
  content = addHeadingIds(content);

  const summary = content.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

  const data = {
    title: formData.get('title')?.toString() ?? '',
    content,
    summary,
    tags: formData.get('tags')?.toString().split(',').filter(Boolean).sort().join(',') ?? '',
  };

  const post = await createPost(data);
  redirect(`/posts/${post.id}`);
}
