'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { updatePost } from '@/db/posts';
import { highlightCodeBlocks, addHeadingIds } from '@/lib/post';

export async function editAction(formData: FormData) {
  let content = formData.get('content')?.toString() ?? '';
  content = highlightCodeBlocks(content);
  content = addHeadingIds(content);

  const summary = content.replace(/<[^>]+>/g, '').slice(0, 100) + '...';

  const data = {
    id: Number(formData.get('id')),
    title: formData.get('title')?.toString() ?? '',
    content,
    summary,
    tags: formData.get('tags')?.toString().split(',').filter(Boolean).sort().join(',') ?? '',
  };

  await updatePost(data);

  const path = `/posts/${data.id}`;
  revalidatePath(path);
  redirect(path);
}
