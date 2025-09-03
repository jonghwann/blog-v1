'use client';
import Link from 'next/link';
import useScrollVisibility from '@/hooks/use-scroll-visibility';
import LogoutButton from '../common/logout-button';
import ThemeButton from '../common/theme-button';
import Nav from './nav';

export default function Header() {
  const marginTop = useScrollVisibility(56);

  return (
    <header
      className='fixed top-0 z-[var(--z-header)] w-full border-b bg-background/80 px-4 backdrop-blur-[5px] backdrop-saturate-[180%]'
      style={{ marginTop }}
    >
      <div className='mx-0 flex h-14 items-center justify-between md:mx-16'>
        <Link href='/posts' className='font-source-code-pro text-sm tracking-[-1px] sm:text-2xl'>
          jonghwan.blog
        </Link>

        <div className='flex items-center gap-3'>
          <ThemeButton />
          <Nav />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
