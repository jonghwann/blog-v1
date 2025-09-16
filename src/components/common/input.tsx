import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  register?: UseFormRegisterReturn;
  errors?: string;
  icon?: React.ReactNode;
  classNames?: {
    container?: string;
    input?: string;
    icon?: string;
    error?: string;
  };
}

export default function Input({ register, errors, icon, classNames, ...rest }: InputProps) {
  return (
    <div className={cn('flex flex-col gap-2', classNames?.container)}>
      <div className='group relative'>
        {icon && (
          <div className={cn('-translate-y-1/2 absolute top-1/2 text-ring group-focus-within:text-ring-focus', classNames?.icon)}>
            {icon}
          </div>
        )}

        <input
          className={cn(
            'h-12 w-full min-w-0 rounded-lg bg-transparent px-3 text-base outline-none ring-1 ring-ring',
            'transition-shadow duration-200 ease-in-out',
            'focus-visible:ring-ring-focus',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            classNames?.input,
          )}
          autoComplete='off'
          {...register}
          {...rest}
        />
      </div>

      {errors && <span className={cn('text-error text-sm', classNames?.error)}>{errors}</span>}
    </div>
  );
}
