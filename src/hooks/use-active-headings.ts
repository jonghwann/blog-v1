'use client';
import { useEffect, useState } from 'react';
import type { TableOfContents } from '@/components/post/post-table-of-contents';

export default function useActiveHeadings(tableOfContents: TableOfContents[]) {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const headerPositions = tableOfContents.map(({ link, id }) => {
      const element = document.getElementById(link.slice(1));
      return { id, top: element?.offsetTop || 0 };
    });

    const handleScroll = () => {
      const scrollY = window.scrollY + 1;
      let currentActiveId = null;

      headerPositions.forEach(({ id, top }) => {
        if (top < scrollY) {
          currentActiveId = id;
        }
      });

      setActiveId(currentActiveId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tableOfContents]);

  return activeId;
}
