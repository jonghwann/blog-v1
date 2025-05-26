import { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { Input as InputUI } from '@/components/ui/input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorClassName?: string;
  name: string;
  errors?: string[];
}

export default function Input({ className, errorClassName, name, errors, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <InputUI
        className={cn(
          'autofill:bg-background h-12 rounded-lg py-0 text-base! shadow-none focus-visible:ring-2',
          className,
        )}
        name={name}
        {...rest}
      />

      {errors?.[0] && <span className={cn('text-error text-sm', errorClassName)}>{errors[0]}</span>}
    </div>
  );
}
