'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Github } from 'lucide-react';

import useScrollVisibility from '@/hooks/use-scroll-visibility';

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

  const marginTop = useScrollVisibility(64);

  return (
    <header className="fixed top-0 z-header w-full border-b border-border backdrop-blur-[5px] transition-transform duration-300" style={{ marginTop }}>
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
