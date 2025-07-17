import { cva } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PostNavigationItemProps {
  variant?: 'prev' | 'next';
  id?: number;
  title?: string;
}

const config = {
  prev: {
    label: 'Previous',
    icon: ChevronLeft,
  },
  next: {
    label: 'Next',
    icon: ChevronRight,
  },
};

const linkVariants = cva('group relative flex flex-col gap-1 py-1 max-w-[75%] sm:max-w-[55%]', {
  variants: {
    variant: {
      prev: 'pr-2 pl-7',
      next: 'pr-7 pl-2 ml-auto',
    },
  },
  defaultVariants: {
    variant: 'prev',
  },
});

const iconVariants = cva(
  'text-secondary-foreground absolute size-5 group-hover:text-foreground transition-colors duration-200 ease-in-out',
  {
    variants: {
      variant: {
        prev: 'left-0',
        next: 'right-0',
      },
    },
    defaultVariants: {
      variant: 'prev',
    },
  },
);

export default function PostNavigationItem({ variant = 'prev', id, title }: PostNavigationItemProps) {
  const { label, icon: Icon } = config[variant];

  return (
    id && (
      <Link className={linkVariants({ variant })} href={`/posts/${id}`}>
        <span className="text-secondary-foreground group-hover:text-foreground text-sm transition-colors duration-200 ease-in-out">
          {label}
        </span>

        <div className="flex items-center">
          <span className="truncate">{title}</span>
          <Icon className={iconVariants({ variant })} />
        </div>
      </Link>
    )
  );
}
