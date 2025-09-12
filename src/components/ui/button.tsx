import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center font-medium transition-colors duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border hover:bg-secondary',
        secondary: 'bg-foreground text-background hover:bg-secondary-inverse',
      },
      size: {
        default: 'h-8 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-lg px-[14px] text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  variant,
  size,
  asChild = false,
  className,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
