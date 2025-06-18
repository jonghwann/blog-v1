'use client';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth';

import { logoutAction } from '@/app/logout/action';

import Nav from './nav';
import Button from '../common/button';

export default function Header() {
  const router = useRouter();

  const isLogin = useAuthStore((state) => state.isLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  const handleLogout = async () => {
    await logoutAction();
    setLogout();
    router.push('/posts');
  };

  return (
    <header className="bg-background/80 fixed top-0 z-[var(--z-header)] w-full border-b backdrop-blur-[5px] backdrop-saturate-[180%]">
      <div className="mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center justify-between px-4">
        <Nav />

        {isLogin && (
          <Button className="h-8 rounded-md text-sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
