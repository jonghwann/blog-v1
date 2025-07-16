'use client';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

interface FabLinkProps {
  className?: string;
  iconClassName?: string;
  href: string;
}

export default function FabLink({ className, iconClassName, href }: FabLinkProps) {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    isLogin && (
      <Link
        href={href}
        className={cn(
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover absolute right-4 bottom-0 flex size-14 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out',
          className,
        )}
      >
        <PlusIcon className={cn('size-5', iconClassName)} />
      </Link>
    )
  );
}
