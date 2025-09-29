'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createPost, updatePost } from '@/api/posts/api';
import type { PostFormData } from '@/api/posts/model';
import Alert from '@/components/common/alert';
import BackButton from '@/components/common/back-button';
import Input from '@/components/common/input';
import TagInput from '@/components/common/tag-input';
import Editor from '@/components/editor/editor';
import useVisible from '@/hooks/use-visible';
import type { PostSummary } from '@/types/post';
import type { Tag } from '@/types/tag';
import Button from '../common/button';

interface PostFormProps {
  variant?: 'write' | 'edit';
  id?: string;
  initialValues?: {
    title: string;
    content: string;
    tags: Tag[];
  };
}

export default function PostForm({ variant = 'write', id, initialValues }: PostFormProps) {
  const config = {
    write: {
      backButtonText: 'Back to Posts',
      backButtonHref: '/posts',
      actionText: 'Publish',
      alertDescription: 'Are you sure you want to publish?',
    },
    edit: {
      backButtonText: 'Back to Post',
      backButtonHref: `/posts/${id}`,
      actionText: 'Update',
      alertDescription: 'Are you sure you want to update?',
    },
  };

  const { backButtonText, backButtonHref, actionText, alertDescription } = config[variant];

  const defaultValues = {
    title: initialValues?.title ?? '',
    content: initialValues?.content ?? '',
    tags: initialValues?.tags.map((tag) => tag.name) ?? [],
  };

  const router = useRouter();
  const { control, register, handleSubmit } = useForm<PostFormData>({ defaultValues });
  const { isVisible, show, hide } = useVisible();

  const handleSuccess = async (data: PostSummary) => {
    try {
      await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: data.id }) });
    } catch (error) {
      console.error(error);
    }

    router.push(`/posts/${data.id}`);
  };

  const handleSettled = () => {
    hide();
  };

  const { mutate: createMutate, isPending: isCreatePending } = useMutation({
    mutationFn: createPost,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: updatePost,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });

  const onSubmit = (data: PostFormData) => {
    if (variant === 'write') {
      createMutate(data);
    } else {
      updateMutate({ id: Number(id), data });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-full'>
      <BackButton href={backButtonHref} text={backButtonText} />
      <Input register={register('title')} name='title' placeholder='Title' classNames={{ input: 'px-0 ring-0 text-[1.15rem]' }} />
      <Editor control={control} name='content' />
      <TagInput control={control} name='tags' className='mb-5' />

      <Alert
        trigger={
          <Button variant='ghost' size='ghost'>
            {actionText}
          </Button>
        }
        title={actionText}
        description={alertDescription}
        onSubmit={handleSubmit(onSubmit)}
        open={isVisible}
        onOpenChange={(open) => (open ? show() : hide())}
        isLoading={isCreatePending || isUpdatePending}
      />
    </form>
  );
}
