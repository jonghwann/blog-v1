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
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover flex items-center rounded-full px-[10px] py-1 text-sm transition-colors duration-200 ease-in-out',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
