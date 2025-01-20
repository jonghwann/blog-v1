'use client';

import Link from 'next/link';

import { useActiveHeadings } from '@/hooks/use-active-headings';

import { cn } from '@/lib/utils';

import { TableOfContents } from '@/types/post';

interface PostTableOfContentsProps {
  className?: string;
  tableOfContents: TableOfContents[];
}

export default function PostTableOfContents({ className, tableOfContents }: PostTableOfContentsProps) {
  const activeIds = useActiveHeadings(tableOfContents);

  return (
    <aside className={cn('block w-[200px] shrink-0', className)}>
      <div className="sticky top-[128px] text-sm">
        <h2 className="mb-2 font-medium">On this page</h2>

        <nav>
          <ul className="flex flex-col gap-2">
            {tableOfContents.map(({ title, link, depth }) => (
              <li key={title} className={depth === 1 ? 'ml-4' : ''}>
                <Link href={link} className={activeIds.includes(link.slice(1)) ? 'text-accent' : 'text-secondary-foreground'}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
