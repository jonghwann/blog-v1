import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
  errorClassName?: string;
  errors?: string[];
}

export default function Input({ className, errorClassName, errors, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className={cn(
          'placeholder:text-secondary-foreground h-12 w-full min-w-0 rounded-lg border bg-transparent px-3 text-base transition-shadow outline-none autofill:shadow-[0_0_0_1000px_var(--background)_inset] focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...rest}
      />

      {errors?.[0] && <span className={cn('text-error text-sm', errorClassName)}>{errors[0]}</span>}
    </div>
  );
}
