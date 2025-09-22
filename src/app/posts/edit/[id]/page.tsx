import { notFound } from 'next/navigation';
import { getPost } from '@/api/posts/api';
import PostForm from '@/components/post/post-form';
import type { Post } from '@/types/post';
import { editAction } from './action';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  let post: Post;

  try {
    ({ post } = await getPost(Number(id)));
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <PostForm
      variant='edit'
      action={editAction}
      backButtonHref={`/posts/${id}`}
      id={id}
      initialValues={{ title: post.title, content: post.content, tags: post.tags }}
    />
  );
}
