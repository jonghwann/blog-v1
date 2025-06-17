'use client';

import Link from 'next/link';

import { PlusIcon } from 'lucide-react';

import { useAuthStore } from '@/store/auth';

import { cn } from '@/lib/utils';

interface FabLinkProps {
  className?: string;
  iconClassName?: string;
  href: string;
}

export default function FabLink({ className, iconClassName, href }: FabLinkProps) {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <>
      {isLogin && (
        <Link
          href={href}
          className={cn(
            'bg-secondary text-secondary-foreground hover:text-foreground absolute right-4 bottom-0 flex size-14 cursor-pointer items-center justify-center rounded-full',
            className,
          )}
        >
          <PlusIcon className={cn('size-5', iconClassName)} />
        </Link>
      )}
    </>
  );
}
