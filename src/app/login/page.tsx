'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { useAuthStore } from '@/store/auth';

import { loginAction } from './action';

export default function LoginPage() {
  const router = useRouter();

  const setLogin = useAuthStore((state) => state.setLogin);

  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      setLogin();
      router.replace('/posts');
    }
  }, [state]);

  return (
    <Form
      className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 px-4 sm:w-[320px] sm:px-0"
      action={formAction}
    >
      <Input name="email" defaultValue={state?.values?.email} placeholder="Email" errors={state?.errors?.email} />

      <Input
        name="password"
        type="password"
        defaultValue={state?.values?.password}
        placeholder="Password"
        errors={state?.errors?.password}
      />

      <Button variant="secondary" size="lg" isLoading={isPending}>
        Login
      </Button>
    </Form>
  );
}
