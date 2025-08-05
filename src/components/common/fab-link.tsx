'use client';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { getMe } from '@/api/auth/auth-server';
import { cn } from '@/lib/utils';

interface FabLinkProps {
  className?: string;
  iconClassName?: string;
  href: string;
}

export default function FabLink({ className, iconClassName, href }: FabLinkProps) {
  const { data: me } = useQuery({ queryKey: ['me'], queryFn: getMe });

  return (
    me?.isLogin && (
      <Link
        href={href}
        className={cn(
          'absolute right-4 bottom-0 flex size-14 cursor-pointer items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-200 ease-in-out hover:bg-secondary-hover',
          className,
        )}
      >
        <PlusIcon className={cn('size-5', iconClassName)} />
      </Link>
    )
  );
}
