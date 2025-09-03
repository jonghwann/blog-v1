import type { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { type buttonVariants, Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  className?: string;
  isLoading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export default function Button({ className, variant = 'default', isLoading, asChild = false, children, ...props }: ButtonProps) {
  return (
    <UIButton className={cn('relative', className)} variant={variant} disabled={isLoading} asChild={asChild} {...props}>
      <span className={cn(isLoading && 'invisible')}>{children}</span>
      {isLoading && <Loader2 className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[1em] w-[1em] animate-spin' />}
    </UIButton>
  );
}
