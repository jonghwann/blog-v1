'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Posts', href: '/posts' },
  { name: 'About', href: '/about' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {NAV_LINKS.map(({ name, href }) => (
          <li key={href}>
            <Link
              className={cn(
                'text-secondary-foreground hover:text-foreground text-sm transition-colors duration-150 ease-in-out',
                href === pathname && 'text-accent-foreground hover:text-accent-foreground',
              )}
              href={href}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
