'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Github } from 'lucide-react';

import { cn } from '@/lib/utils';

import ThemeToggleButton from '@/components/atoms/theme-toggle-button';

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

  return (
    <header className="sticky top-0 z-header mb-16 w-full border-b border-border backdrop-blur-[5px]">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-4">
        <nav>
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn('text-sm text-secondary-foreground hover:text-foreground', pathname.startsWith(href) && 'text-accent hover:text-accent')}
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

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
