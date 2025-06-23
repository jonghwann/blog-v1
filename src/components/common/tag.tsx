import Link from 'next/link';

import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <Link
      className={cn('bg-secondary text-secondary-foreground hover:bg-muted rounded-full px-[10px] py-1 text-sm')}
      href={''}
    >
      {children}
    </Link>
  );
}
