'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useScrollVisibility from '@/hooks/use-scroll-visibility';
import { cn } from '@/lib/utils';
import LogoutButton from '../common/logout-button';
import ThemeButton from '../common/theme-button';
import Nav from './nav';

const relativeHeaderPaths = ['/posts/write', '/posts/edit'];

export default function Header() {
  const pathname = usePathname();
  const isRelativeHeader = relativeHeaderPaths.some((path) => pathname.startsWith(path));

  const marginTop = useScrollVisibility(56, !isRelativeHeader);

  return (
    <header
      className={cn(
        'fixed top-0 z-[var(--z-header)] w-full bg-background/80 px-4 shadow-[var(--shadow)] backdrop-blur-[5px]',
        isRelativeHeader && 'relative',
      )}
      style={{ marginTop }}
    >
      <div className='mx-0 flex h-14 items-center justify-between min-[860px]:mx-16'>
        <Link href='/posts' className='font-source-code-pro text-sm tracking-[-1px] sm:text-2xl'>
          jonghwan.blog
        </Link>

        <div className='flex items-center gap-[15px]'>
          <ThemeButton />
          <Nav />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
