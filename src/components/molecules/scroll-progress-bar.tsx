'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (currentScrollY / scrollableHeight) * 100;
      setScrollPercentage(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-header h-1 w-full backdrop-blur-[5px]">
      <div className="h-full bg-accent" style={{ width: `${scrollPercentage}%` }} />
    </div>
  );
}
