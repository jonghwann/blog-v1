import Form from 'next/form';

import Input from '@/components/common/input';
import Editor from '@/components/editor/editor';
import EditorTags from '@/components/editor/editor-tags';

export default function WritePage() {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const title = formData.get('title');
    const content = formData.get('content');
    console.log(title, content);
  };

  return (
    <section className="relative mx-auto w-full max-w-(--breakpoint-md) px-4">
      <Form action={handleSubmit}>
        <Input className="border-none px-0 focus-visible:ring-0" name="title" placeholder="제목을 입력해 주세요." />
        <Editor />
        <EditorTags className="mb-5" />
      </Form>
    </section>
  );
}
