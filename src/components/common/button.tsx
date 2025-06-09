'use client';

import { useFormStatus } from 'react-dom';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button as UIButton } from '@/components/ui/button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'default' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'default', className, children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <UIButton
      className={cn('h-12 cursor-pointer rounded-lg px-3 py-0 text-base', className)}
      variant={variant}
      disabled={pending}
      {...props}
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </UIButton>
  );
}
