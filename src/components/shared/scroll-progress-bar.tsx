'use client';

import useScrollProgress from '@/hooks/use-scroll-progress';

export default function ScrollProgressBar() {
  const scrollPercentage = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-header h-1 w-full backdrop-blur-[5px]">
      <div className="h-full bg-accent-foreground" style={{ width: `${scrollPercentage}%` }} />
    </div>
  );
}
