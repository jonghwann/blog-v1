import Link from 'next/link';

import { cn } from '@/lib/utils';

interface TagProps {
  className?: string;
  href: string;
  children: React.ReactNode;
}

export default function Tag({ className, href, children }: TagProps) {
  return (
    <Link
      className={cn(
        'bg-secondary text-secondary-foreground hover:bg-muted rounded-full px-[10px] py-[6px] text-sm',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
