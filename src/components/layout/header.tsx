'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import useScrollVisibility from '@/hooks/use-scroll-visibility';

import { cn } from '@/lib/utils';

const NAV_LINKS = [
  {
    name: 'Posts',
    href: '/posts',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export default function Header() {
  const pathname = usePathname();

  const marginTop = useScrollVisibility(64);

  return (
    <header
      className="fixed top-0 z-header w-full border-b border-border bg-[#ffffff]/80 backdrop-blur-[5px] backdrop-saturate-[180%] dark:bg-[#000000]/80"
      style={{ marginTop }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-screen-xl items-center px-4">
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map(({ name, href }) => (
            <li key={href}>
              <Link
                className={cn(
                  'text-sm text-secondary-foreground hover:text-foreground',
                  pathname.startsWith(href) && 'text-accent-foreground hover:text-accent-foreground',
                )}
                href={href}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
