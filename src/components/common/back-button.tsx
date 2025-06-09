import Link from 'next/link';

import { ArrowLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  href?: string;
  text?: string;
}

export default function BackButton({ className, href = '/posts', text = 'Back to Posts' }: BackButtonProps) {
  return (
    <Link
      className={cn(
        '*:text-secondary-foreground hover:*:text-foreground mb-16 inline-flex items-center gap-2',
        className,
      )}
      href={href}
    >
      <ArrowLeftIcon className="size-4" />
      <span className="text-sm">{text}</span>
    </Link>
  );
}
