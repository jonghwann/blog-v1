import Link from 'next/link';

import { cn } from '@/lib/utils';

import { CategoryItem } from '@/types/post';

interface TagGroupProps {
  className?: string;
  tags: CategoryItem[];
  activeTag: string;
  baseUrl: string;
}

export default function TagGroup({ className, tags, activeTag, baseUrl }: TagGroupProps) {
  return (
    <nav className={className}>
      <ul className="flex flex-wrap gap-[8px_6px]">
        {tags.map(({ categoryPublicName, category }) => (
          <li key={category}>
            <Link
              className={cn(
                'rounded-full bg-secondary-background px-3 py-[6px] text-sm text-secondary-foreground hover:bg-tertiary-background',
                category === activeTag && 'bg-accent-background text-accent-foreground hover:bg-accent-background',
              )}
              href={`${baseUrl}/${category}`}
            >
              {categoryPublicName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
