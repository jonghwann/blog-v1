'use client';
import Link from 'next/link';
import useActiveHeadings from '@/hooks/use-active-headings';
import { createTableOfContents } from '@/lib/posts';
import { cn } from '@/lib/utils';

export interface TableOfContents {
  id: number;
  title: string;
  link: string;
  depth: number;
}

interface PostTableOfContentsProps {
  className?: string;
  content: string;
}

export default function PostTableOfContents({ className, content }: PostTableOfContentsProps) {
  const tableOfContents = createTableOfContents(content);
  const activeId = useActiveHeadings(tableOfContents);

  return (
    <aside className={cn('block w-[240px] shrink-0', className)}>
      <nav className='sticky top-[100px] font-medium text-sm'>
        <ul className='flex flex-col gap-2'>
          {tableOfContents.map(({ id, title, link, depth }) => (
            <li key={title} className={depth ? 'ml-4' : ''}>
              <Link
                className={cn(
                  'block font-nanum-round transition-transform',
                  id === (activeId ?? 0) ? '-translate-x-[10px] text-accent-foreground' : 'translate-x-0',
                )}
                href={link}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
