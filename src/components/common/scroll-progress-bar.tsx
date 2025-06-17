'use client';

import useScrollProgress from '@/hooks/use-scroll-progress';

export default function ScrollProgressBar() {
  const scrollPercentage = useScrollProgress();

  return (
    <div className="z-header fixed top-0 left-0 z-[var(--z-scroll-progress-bar)] h-1 w-full backdrop-blur-[5px]">
      <div className="bg-accent-foreground h-full" style={{ width: `${scrollPercentage}%` }} />
    </div>
  );
}
