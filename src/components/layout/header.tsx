'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logout } from '@/api/auth/auth';
import { getMe } from '@/api/auth/auth-server';
import useScrollVisibility from '@/hooks/use-scroll-visibility';
import Button from '../common/button';
import Nav from './nav';

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const marginTop = useScrollVisibility(64);

  const { data: me } = useQuery({ queryKey: ['me'], queryFn: getMe });

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/posts');
    },
  });

  return (
    <header
      className='fixed top-0 z-[var(--z-header)] w-full border-b bg-background/80 backdrop-blur-[5px] backdrop-saturate-[180%]'
      style={{ marginTop }}
    >
      <div className='mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center justify-between px-4'>
        <Nav />

        {me?.isLogin && (
          <Button isLoading={isPending} onClick={() => mutate()}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
