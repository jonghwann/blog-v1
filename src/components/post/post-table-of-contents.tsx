'use client';

import Link from 'next/link';

import useActiveHeadings from '@/hooks/use-active-headings';
import { createTableOfContents } from '@/lib/post';
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
  const activeId = useActiveHeadings({ tableOfContents, options: { rootMargin: '-82px 0px 0px 0px', threshold: 1 } });

  return (
    <aside className={cn('block w-[200px] shrink-0', className)}>
      <div className="sticky top-[128px] text-xs">
        <h2 className="mb-3 text-sm font-medium">On this page</h2>
        <nav>
          <ul className="flex flex-col gap-1.5">
            {tableOfContents.map(({ id, title, link, depth }) => (
              <li key={title} className={depth ? 'ml-3' : ''}>
                <Link
                  className={id + 1 === activeId ? 'text-accent-foreground font-semibold' : 'text-secondary-foreground'}
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
