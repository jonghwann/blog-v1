'use client';

import Link from 'next/link';

import useActiveHeadings from '@/hooks/use-active-headings';

import { createTableOfContents } from '@/lib/post';
import { cn } from '@/lib/utils';

interface PostTableOfContentsProps {
  className?: string;
  content: string;
}

export default function PostTableOfContents({ className, content }: PostTableOfContentsProps) {
  const tableOfContents = createTableOfContents(content);
  const activeIds = useActiveHeadings(tableOfContents);

  return (
    <aside className={cn('block w-[200px] shrink-0', className)}>
      <div className="sticky top-[128px] text-xs">
        <h2 className="mb-1.5 text-sm font-medium">On this page</h2>
        <nav>
          <ul className="flex flex-col gap-1.5">
            {tableOfContents.map(({ title, link, depth }) => (
              <li key={title} className={depth === 1 ? 'ml-3' : ''}>
                <Link
                  className={
                    activeIds.includes(link.slice(1))
                      ? 'text-accent-foreground font-semibold'
                      : 'text-secondary-foreground'
                  }
                  href={link}
                >
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
