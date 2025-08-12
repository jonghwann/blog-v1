'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { login } from '@/api/auth/api';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { loginSchema } from '@/schema/login-schema';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: 'onChange' });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/posts');
    },
    onError: async (error) => {
      if (error instanceof HTTPError) {
        const data = await error.response.json();
        toast.error(data.message);
      } else {
        console.error(error);
      }
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data);
  };

  return (
    <form
      className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex w-full transform flex-col gap-3 px-4 sm:w-[320px] sm:px-0'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input register={register('email')} placeholder='Email' errors={errors?.email?.message} />
      <Input register={register('password')} type='password' placeholder='Password' errors={errors?.password?.message} />

      <Button variant='secondary' size='lg' isLoading={isPending}>
        Login
      </Button>
    </form>
  );
}
