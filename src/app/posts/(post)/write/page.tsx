import Form from 'next/form';

import { writeAction } from './action';

import BackButton from '@/components/common/back-button';
import Input from '@/components/common/input';
import Editor from '@/components/editor/editor';
import EditorTags from '@/components/editor/editor-tags';
import EditorActions from '@/components/editor/editor-actions';

export default function WritePage() {
  return (
    <Form action={writeAction}>
      <BackButton />
      <Input className="border-none px-0 focus-visible:ring-0" name="title" placeholder="Title" />
      <Editor />
      <EditorTags className="mb-5" />
      <EditorActions />
    </Form>
  );
}
