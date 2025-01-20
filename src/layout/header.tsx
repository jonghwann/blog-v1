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
    <header className="sticky top-0 z-header mb-[56px] w-full border-b border-border backdrop-blur">
      <div className="mx-auto flex h-[56px] w-full max-w-screen-xl items-center justify-between px-4">
        <nav>
          <ul className="flex items-center">
            {NAV_LINKS.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium text-secondary-foreground hover:text-foreground',
                    pathname.startsWith(href) && 'bg-secondary-background text-foreground',
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
            <Github size={18} />
          </Link>

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
