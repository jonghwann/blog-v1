'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import useScrollVisibility from '@/hooks/use-scroll-visibility';

import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Posts', href: '/posts' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();

  const marginTop = useScrollVisibility(64);

  return (
    <header
      className="bg-background/80 fixed top-0 w-full border-b backdrop-blur-[5px] backdrop-saturate-[180%]"
      style={{ marginTop }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center px-4">
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map(({ name, href }) => (
            <li key={href}>
              <Link
                className={cn(
                  'text-secondary-foreground hover:text-foreground text-sm',
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
