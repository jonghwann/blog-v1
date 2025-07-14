import { type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { Button as UIButton, buttonVariants } from '@/components/ui/button';

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({ className, variant = 'default', isLoading, children, ...props }: ButtonProps) {
  return (
    <UIButton className={`relative ${className}`} variant={variant} disabled={isLoading} {...props}>
      <span className={isLoading ? 'invisible' : ''}>{children}</span>

      {isLoading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="h-[1em] w-[1em] animate-spin" />
        </span>
      )}
    </UIButton>
  );
}
