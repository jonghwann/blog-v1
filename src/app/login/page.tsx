'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { login } from '@/api/auth/api';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { type LoginFormValues, loginSchema } from '@/schemas/login-schema';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/posts');
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex w-full transform flex-col gap-3 px-4 sm:w-[320px] sm:px-0'
    >
      <Input register={register('email')} placeholder='Email' errors={errors?.email?.message} />
      <Input register={register('password')} type='password' placeholder='Password' errors={errors?.password?.message} />

      <Button size='lg' isLoading={isPending}>
        Login
      </Button>
    </form>
  );
}
