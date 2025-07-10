'use client';

import { useRef, useState, useEffect } from 'react';

import { type TableOfContents } from '@/components/post/post-table-of-contents';

export default function useActiveHeadings(tableOfContents: TableOfContents[]) {
  const observer = useRef<IntersectionObserver>(null);

  const [activeIdList, setActiveIdList] = useState<string[]>([]);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveIdList((prev) => [...prev, entry.target.id]);
        } else {
          setActiveIdList((prev) => prev.filter((activeId) => activeId !== entry.target.id));
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-82px 0px 0px 0px',
      threshold: 1,
    });

    tableOfContents.forEach(({ link }: { link: string }) => {
      const element = document.getElementById(link.slice(1));
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, []);

  const activeIdArr = tableOfContents.filter(({ link }) => activeIdList.includes(link.slice(1)));
  return Math.min(...activeIdArr.map(({ id }) => id)) || 1;
}
