'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { logoutAction } from '@/app/logout/action';
import useScrollVisibility from '@/hooks/use-scroll-visibility';
import { useAuthStore } from '@/store/auth';

import Nav from './nav';
import Button from '../common/button';

export default function Header() {
  const router = useRouter();

  const { isLogin, setLogout } = useAuthStore(
    useShallow((state) => ({ isLogin: state.isLogin, setLogout: state.setLogout })),
  );

  const [state, formAction, isPending] = useActionState(logoutAction, null);

  const marginTop = useScrollVisibility(64);

  useEffect(() => {
    if (state?.success) {
      setLogout();
      router.push('/posts');
    }
  }, [state]);

  return (
    <header
      className="bg-background/80 fixed top-0 z-[var(--z-header)] w-full border-b backdrop-blur-[5px] backdrop-saturate-[180%]"
      style={{ marginTop }}
    >
      <div className="mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center justify-between px-4">
        <Nav />

        {isLogin && (
          <Form action={formAction}>
            <Button isLoading={isPending}>Logout</Button>
          </Form>
        )}
      </div>
    </header>
  );
}
