import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  register?: UseFormRegisterReturn;
  className?: string;
  errorClassName?: string;
  errors?: string;
}

export default function Input({ register, className, errorClassName, errors, ...rest }: InputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className={cn(
          'h-12 w-full min-w-0 rounded-lg border bg-transparent px-3 text-base outline-none transition-shadow duration-200 ease-in-out placeholder:text-secondary-foreground focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        autoComplete='off'
        {...register}
        {...rest}
      />

      {errors && <span className={cn('text-error text-sm', errorClassName)}>{errors}</span>}
    </div>
  );
}
