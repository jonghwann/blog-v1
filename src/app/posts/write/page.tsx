import Form from 'next/form';

import { writeAction } from './action';

import Input from '@/components/common/input';
import Editor from '@/components/editor/editor';
import EditorTags from '@/components/editor/editor-tags';
import EditorActions from '@/components/editor/editor-actions';

export default function WritePage() {
  return (
    <section className="relative mx-auto w-full max-w-(--breakpoint-md) px-4">
      <Form action={writeAction}>
        <Input className="border-none px-0 focus-visible:ring-0" name="title" placeholder="제목을 입력해 주세요." />
        <Editor />
        <EditorTags className="mb-5" />
        <EditorActions cancelText="나가기" submitText="작성하기" />
      </Form>
    </section>
  );
}
