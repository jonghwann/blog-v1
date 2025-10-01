import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
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
        'mb-16 inline-flex items-center gap-2 font-nanum-round *:text-secondary-foreground *:transition-colors *:duration-300 *:ease-in-out hover:*:text-foreground',
        className,
      )}
      href={href}
    >
      <ArrowLeftIcon className='size-5' />
      <span>{text}</span>
    </Link>
  );
}
