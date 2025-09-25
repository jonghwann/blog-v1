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
        <h3 className='mb-6 font-bold leading-[1]'>TAG LIST</h3>

        <ul className='flex flex-col gap-4'>
          {tags.map((tag) => (
            <li key={tag.name} className='leading-[1]'>
              <Link href={`/tags/${tag.name}`} className='text-secondary-foreground hover:text-foreground'>
                {tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
