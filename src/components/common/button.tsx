import { Loader2 } from 'lucide-react';

import { type VariantProps } from 'class-variance-authority';

import { Button as UIButton, buttonVariants } from '@/components/ui/button';

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({ className, variant = 'default', isLoading, children, ...props }: ButtonProps) {
  return (
    <UIButton className={className} variant={variant} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </UIButton>
  );
}
