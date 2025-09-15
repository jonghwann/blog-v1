import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Tag } from '@/types/tag';

interface TagListProps {
  tags: Tag[];
  className?: string;
}

export default function TagList({ tags, className }: TagListProps) {
  return (
    <aside className={cn('w-[200px]', className)}>
      <nav>
        <h3 className='mb-6 font-bold text-secondary-foreground'>TAG LIST</h3>

        <ul className='flex flex-col gap-2'>
          {tags.map((tag) => (
            <li key={tag.name}>
              <Link href={`/posts/tag/${tag.name}`} className='text-tertiary-foreground hover:text-foreground'>
                {tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
