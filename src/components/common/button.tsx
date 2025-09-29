import type { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { type buttonVariants, Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export default function Button({ children, isLoading, className, ...props }: ButtonProps) {
  return (
    <UIButton disabled={isLoading} className={cn('relative', className)} {...props}>
      <span className={cn(isLoading && 'invisible')}>{children}</span>
      {isLoading && <Loader2 className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[1em] w-[1em] animate-spin' />}
    </UIButton>
  );
}
