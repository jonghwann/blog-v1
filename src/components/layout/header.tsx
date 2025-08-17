'use client';
import useScrollVisibility from '@/hooks/use-scroll-visibility';
import LogoutButton from '../common/logout-button';
import Nav from './nav';

export default function Header() {
  const marginTop = useScrollVisibility(64);

  return (
    <header
      className='fixed top-0 z-[var(--z-header)] w-full border-b bg-background/80 backdrop-blur-[5px] backdrop-saturate-[180%]'
      style={{ marginTop }}
    >
      <div className='mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center justify-between px-4'>
        <Nav />
        <LogoutButton />
      </div>
    </header>
  );
}
