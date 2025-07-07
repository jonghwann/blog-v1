'use client';

import { useRef, useState, useActionState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Form from 'next/form';

import BackButton from '@/components/common/back-button';
import Input from '@/components/common/input';
import Editor from '@/components/editor/editor';
import EditorTags from '@/components/editor/editor-tags';
import EditorActions from '@/components/editor/editor-actions';
import Alert from '@/components/common/alert';

interface PostFormProps {
  mode?: 'write' | 'edit';
  action: (prevState: unknown, formData: FormData) => Promise<{ success: boolean; postId?: number }>;
  backButtonHref?: string;
  id?: string;
  initialValues?: {
    title: string;
    content: string;
    tags: string;
  };
}

export default function PostForm({ mode = 'write', action, backButtonHref, id, initialValues }: PostFormProps) {
  const actionText = mode === 'write' ? 'Publish' : 'Update';
  const alertDescription = mode === 'write' ? 'Are you sure you want to publish?' : 'Are you sure you want to update?';

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitAlertOpen, setSubmitAlertOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(action, null);

  const handleSubmit = () => {
    setSubmitAlertOpen(true);
  };

  useEffect(() => {
    if (state?.success) {
      setSubmitAlertOpen(false);
      router.push(`/posts/${state.postId}`);
    }
  }, [state]);

  return (
    <Form ref={formRef} action={formAction}>
      <BackButton href={backButtonHref} />
      {id && <input type="hidden" name="id" value={id} />}
      <Input
        className="border-none px-0 focus-visible:ring-0"
        name="title"
        placeholder="Title"
        defaultValue={initialValues?.title}
      />
      <Editor defaultValue={initialValues?.content} />
      <EditorTags className="mb-5" defaultValue={initialValues?.tags} />
      <EditorActions actions={[{ text: actionText, onClick: handleSubmit }]} />

      <Alert
        open={isSubmitAlertOpen}
        description={alertDescription}
        isLoading={isPending}
        onCancel={() => setSubmitAlertOpen(false)}
        actionText={actionText}
        onAction={() => {
          const formData = new FormData(formRef.current!);
          startTransition(() => formAction(formData));
        }}
      />
    </Form>
  );
}
