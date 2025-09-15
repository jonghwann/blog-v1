import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  className?: string;
}

export default function Tag({ children, href, isActive, className }: TagProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-full bg-secondary px-[10px] py-[6px] text-secondary-foreground text-sm hover:bg-secondary-hover',
        isActive && 'bg-secondary-foreground text-background hover:bg-secondary-foreground',
        className,
      )}
    >
      {children}
    </Link>
  );
}
