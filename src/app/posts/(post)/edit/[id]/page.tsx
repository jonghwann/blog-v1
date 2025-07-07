import { notFound } from 'next/navigation';
import Form from 'next/form';

import { editAction } from './action';

import { findPostById } from '@/db/posts';

import BackButton from '@/components/common/back-button';
import Input from '@/components/common/input';
import Editor from '@/components/editor/editor';
import EditorTags from '@/components/editor/editor-tags';
import EditorActions from '@/components/editor/editor-actions';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  const post = await findPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <Form action={editAction}>
      <BackButton href={`/posts/${id}`} />
      <input type="hidden" name="id" value={id} />
      <Input
        className="border-none px-0 focus-visible:ring-0"
        name="title"
        placeholder="Title"
        defaultValue={post.title}
      />
      <Editor defaultValue={post.content} />
      <EditorTags className="mb-5" defaultValue={post.tags} />
      <EditorActions />
    </Form>
  );
}
