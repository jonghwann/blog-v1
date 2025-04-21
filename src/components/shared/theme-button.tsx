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
          className={cn('flex h-8 w-8 items-center justify-center rounded-full', theme === mode && 'bg-secondary-background')}
          key={mode}
          onClick={() => setTheme(mode)}
        >
          <Icon className={cn('h-4 w-4 hover:text-foreground', theme === mode ? 'text-foreground' : 'text-secondary-foreground')} />
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
