import { type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Fragment } from 'react';

import { Button as UIButton, buttonVariants } from '@/components/ui/button';

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  className?: string;
  isLoading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export default function Button({
  className,
  variant = 'default',
  isLoading,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <UIButton className={`relative ${className}`} variant={variant} disabled={isLoading} asChild={asChild} {...props}>
      <Fragment>
        <span className={isLoading ? 'invisible' : ''}>{children}</span>

        {isLoading && (
          <Loader2 className="absolute top-1/2 left-1/2 h-[1em] w-[1em] -translate-x-1/2 -translate-y-1/2 animate-spin" />
        )}
      </Fragment>
    </UIButton>
  );
}
