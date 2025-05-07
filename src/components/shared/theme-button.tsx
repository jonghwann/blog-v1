'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { Sun, Monitor, Moon } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="flex h-10 w-[104px] items-center rounded-full border p-[3px]">
      {themeOptions.map(({ mode, icon: Icon }) => (
        <button
          className={cn('group flex size-8 cursor-pointer items-center justify-center rounded-full', theme === mode && 'bg-secondary')}
          key={mode}
          onClick={() => setTheme(mode)}
        >
          <Icon className={cn('group-hover:text-foreground size-4', theme === mode ? 'text-foreground' : 'text-secondary-foreground')} />
        </button>
      ))}
    </div>
  );
}

const themeOptions = [
  { mode: 'light', icon: Sun },
  { mode: 'system', icon: Monitor },
  { mode: 'dark', icon: Moon },
];
