'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const themeOptions = [
  { mode: 'light', Icon: Sun },
  { mode: 'system', Icon: Monitor },
  { mode: 'dark', Icon: Moon },
];

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleThemeChange = (mode: string) => {
    document.documentElement.classList.add('no-transition');
    setTheme(mode);
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 100);
  };

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className='flex h-10 w-[104px] items-center rounded-full border p-[3px]'>
      {themeOptions.map(({ mode, Icon }) => (
        <button
          type='button'
          className={cn('group flex size-8 cursor-pointer items-center justify-center rounded-full', theme === mode && 'bg-secondary')}
          key={mode}
          onClick={() => handleThemeChange(mode)}
        >
          <Icon
            className={cn(
              'size-4 transition-colors duration-200 ease-in-out group-hover:text-foreground',
              theme === mode ? 'text-foreground' : 'text-secondary-foreground',
            )}
          />
        </button>
      ))}
    </div>
  );
}
