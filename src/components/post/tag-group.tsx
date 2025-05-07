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
                'bg-secondary text-secondary-foreground hover:bg-muted rounded-full px-3 py-[6px] text-sm',
                category === activeTag && 'bg-accent text-accent-foreground hover:bg-accent-background',
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
