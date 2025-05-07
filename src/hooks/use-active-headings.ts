import { useRef, useState, useEffect } from 'react';

import { TableOfContents } from '@/types/post';

export default function useActiveHeadings(tableOfContents: TableOfContents[]) {
  const observer = useRef<IntersectionObserver>();

  const [activeIdList, setActiveIdList] = useState<string[]>([]);
  const [lastActiveId, setLastActiveId] = useState('');

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const targetId = entry.target.id;

        setActiveIdList((prev) => {
          if (entry.isIntersecting) {
            setLastActiveId('');
            return [...prev, targetId];
          } else {
            if (prev.length === 1) setLastActiveId(prev[0]);
            return prev.filter((activeId) => activeId !== targetId);
          }
        });
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 1,
    });

    tableOfContents.forEach(({ link }) => {
      const element = document.getElementById(link.slice(1));
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, [tableOfContents]);

  return [...activeIdList, lastActiveId];
}
