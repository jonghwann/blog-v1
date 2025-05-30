import Form from 'next/form';

import Input from '@/components/common/input';
import Editor from '@/components/editor/editor';

export default function WritePage() {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const title = formData.get('title');
    const content = formData.get('content');
    console.log(title, content);
  };

  return (
    <section className="mx-auto w-full max-w-(--breakpoint-md) px-4">
      <Form action={handleSubmit}>
        <Input className="border-none px-2 focus-visible:ring-0" name="title" placeholder="제목을 입력해주세요." />
        <Editor />
        <button type="submit">Submit</button>
      </Form>
    </section>
  );
}
