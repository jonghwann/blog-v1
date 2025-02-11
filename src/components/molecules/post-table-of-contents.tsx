'use client';

import Link from 'next/link';

import useActiveHeadings from '@/hooks/use-active-headings';

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
      <div className="sticky top-[120px] text-xs">
        <h2 className="mb-1.5 text-sm font-medium">On this page</h2>
        <nav>
          <ul className="flex flex-col gap-1.5">
            {tableOfContents.map(({ title, link, depth }) => (
              <li key={title} className={depth === 1 ? 'ml-3' : ''}>
                <Link href={link} className={activeIds.includes(link.slice(1)) ? 'font-semibold text-accent-foreground' : 'text-secondary-foreground'}>
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
