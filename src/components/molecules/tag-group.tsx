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
        {tags.map(({ category, categorySlug }) => (
          <li key={categorySlug}>
            <Link
              href={`${baseUrl}/${categorySlug}`}
              className={cn(
                'rounded-full bg-secondary-background px-3 py-[6px] text-sm font-medium text-secondary-foreground hover:bg-tertiary-background',
                categorySlug === 'all' && 'hidden',
                categorySlug === activeTag && 'bg-[#e8f3ff] text-accent hover:bg-[#e8f3ff] dark:bg-[#1a2847] dark:hover:bg-[#1a2847]',
              )}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
