'use client';
import { useMutation } from '@tanstack/react-query';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updatePost } from '@/api/posts/api';
import type { PostData } from '@/api/posts/model';
import Alert from '@/components/common/alert';
import BackButton from '@/components/common/back-button';
import Input from '@/components/common/input';
import TagInput from '@/components/common/tag-input';
import Editor from '@/components/editor/editor';
import EditorActions from '@/components/editor/editor-actions';
import type { Tag } from '@/types/tag';

interface PostFormProps {
  variant?: 'write' | 'edit';
  action: (prevState: unknown, formData: FormData) => Promise<{ success: boolean; postId?: number }>;
  backButtonHref?: string;
  id?: string;
  initialValues?: {
    title: string;
    content: string;
    tags: Tag[];
  };
}

const config = {
  write: {
    backButtonText: 'Back to Posts',
    actionText: 'Publish',
    alertDescription: 'Are you sure you want to publish?',
  },
  edit: {
    backButtonText: 'Back to Post',
    actionText: 'Update',
    alertDescription: 'Are you sure you want to update?',
  },
};

interface DefaultValues {
  title: string;
  content: string;
  tags: string[];
}

export default function PostForm({ variant = 'write', action, backButtonHref, id, initialValues }: PostFormProps) {
  const { backButtonText, actionText, alertDescription } = config[variant];

  const router = useRouter();

  // const formRef = useRef<HTMLFormElement>(null);

  // const [isSubmitAlertOpen, setSubmitAlertOpen] = useState(false);

  // const [state, formAction, isPending] = useActionState(action, null);

  const { control, register, handleSubmit, watch } = useForm<DefaultValues>({
    defaultValues: {
      title: initialValues?.title ?? '',
      content: initialValues?.content ?? '',
      tags: initialValues?.tags.map((tag) => tag.name) ?? [],
    },
    mode: 'onChange',
  });

  console.log(watch('title'));
  console.log(watch('content'));
  console.log(watch('tags'));

  const { mutate } = useMutation({
    mutationFn: updatePost,
  });

  // const handleSubmit = () => {
  //   setSubmitAlertOpen(true);
  // };

  // useEffect(() => {
  //   if (state?.success) {
  //     setSubmitAlertOpen(false);
  //     router.push(`/posts/${state.postId}`);
  //   }
  // }, [state]);

  const onSubmit = (data: PostData) => {
    mutate({ id: Number(id), data });
  };

  return (
    // <Form ref={formRef} action={formAction}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <BackButton href={backButtonHref} text={backButtonText} />
      {/* {id && <input type='hidden' name='id' value={id} />} */}
      <Input
        register={register('title')}
        className='px-0 focus-visible:outline-none'
        name='title'
        placeholder='Title'
        defaultValue={initialValues?.title}
      />
      <Editor control={control} name='content' defaultValue={initialValues?.content} />
      <TagInput control={control} name='tags' className='mb-5' defaultValue={initialValues?.tags.map((tag) => tag.name)} />
      <EditorActions actions={[{ text: actionText, onClick: () => {} }]} />
      <button type='submit'>submit</button>

      {/* <Alert
        open={isSubmitAlertOpen}
        description={alertDescription}
        isLoading={isPending}
        onCancel={() => setSubmitAlertOpen(false)}
        actionText={actionText}
        onAction={() => {
          const formData = new FormData(formRef.current!);
          startTransition(() => formAction(formData));
        }}
      /> */}
      {/* </Form> */}
    </form>
  );
}
