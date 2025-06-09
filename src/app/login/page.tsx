'use client';

import { useActionState } from 'react';
import Form from 'next/form';

import { loginAction } from './action';

import Input from '@/components/common/input';
import Button from '@/components/common/button';

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <Form
      className="absolute top-1/2 left-1/2 flex w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3"
      action={formAction}
    >
      <Input
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state?.values.email}
        placeholder="Email"
        errors={state?.fieldErrors.email}
      />

      <Input
        name="password"
        type="password"
        defaultValue={state?.values.password}
        placeholder="Password"
        errors={state?.fieldErrors.password}
      />

      <Button variant="secondary">Login</Button>
    </Form>
  );
}
