import { notFound } from 'next/navigation';

import PostForm from '@/components/post/post-form';
import { findPostById } from '@/db/posts';

import { editAction } from './action';


interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  let post = null;

  try {
    post = await findPostById(Number(id));
  } catch (error) {
    console.error('Error in EditPage:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      mode="edit"
      action={editAction}
      backButtonHref={`/posts/${id}`}
      id={id}
      initialValues={{ title: post.title, content: post.content, tags: post.tags }}
    />
  );
}
