'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { logoutAction } from '@/app/logout/action';

import Form from 'next/form';
import Button from '../common/button';

interface ClientHeaderProps {
  id?: number;
}

export default function ClientHeader({ id }: ClientHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="bg-background/80 sticky top-0 z-[var(--z-header)] mb-16 w-full border-b backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="mx-auto flex h-16 w-full max-w-(--breakpoint-xl) items-center justify-between px-4">
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map(({ name, href }) => (
            <li key={href}>
              <Link
                className={cn(
                  'text-secondary-foreground hover:text-foreground text-sm transition-colors duration-150 ease-in-out',
                  pathname.startsWith(href) && 'text-accent-foreground hover:text-accent-foreground',
                )}
                href={href}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {id && (
          <Form action={logoutAction}>
            <Button className="h-8 rounded-md text-sm">Log out</Button>
          </Form>
        )}
      </nav>
    </header>
  );
}

const NAV_LINKS = [
  { name: 'Posts', href: '/posts' },
  { name: 'About', href: '/about' },
];
