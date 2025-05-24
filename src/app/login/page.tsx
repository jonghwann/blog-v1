'use client';

import { useActionState } from 'react';
import Form from 'next/form';

import { loginAction } from './action';

import Input from '@/components/common/input';

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <Form
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded bg-gray-950 p-8 shadow-md"
      action={formAction}
    >
      <Input
        name="email"
        type="email"
        defaultValue={state?.values.email}
        placeholder="이메일"
        errors={state?.fieldErrors.email}
      />

      <Input
        name="password"
        type="password"
        defaultValue={state?.values.password}
        placeholder="비밀번호"
        errors={state?.fieldErrors.password}
      />

      <button className="rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700">로그인</button>
    </Form>
  );
}
