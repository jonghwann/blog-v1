'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Github } from 'lucide-react';

import { cn } from '@/lib/utils';

import ThemeToggle from '@/components/atoms/theme-toggle';

const NAV_LINKS = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Posts',
    href: '/posts',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed z-header w-full border-b border-[--color-border] bg-[--color-bg]">
      <div className="mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between px-4">
        <nav>
          <ul className="flex items-center">
            {NAV_LINKS.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'rounded-full px-4 py-1 text-sm text-[--color-text-muted] transition-colors hover:text-[--color-text]',
                    pathname.startsWith(href) && 'bg-[--color-bg-muted] font-semibold text-[--color-text]',
                  )}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <Link href="https://github.com/wkdwhdghks" target="_blank" className="icon-box">
            <Github size={20} />
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
