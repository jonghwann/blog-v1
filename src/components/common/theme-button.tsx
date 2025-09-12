'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const icons = [
  { Icon: FaSun, theme: 'light' },
  { Icon: FaMoon, theme: 'dark' },
];

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = () => {
    document.documentElement.classList.add('transitions-limited');
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

    setTimeout(() => {
      document.documentElement.classList.remove('transitions-limited');
    }, 120);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button className='group size-5 cursor-pointer overflow-hidden' type='button' onClick={handleClick}>
      {icons.map(({ Icon, theme }) => (
        <Icon
          className={cn(
            'size-5 text-tertiary-foreground transition-transform duration-300 ease-in-out group-hover:text-foreground',
            resolvedTheme === 'light' ? '-translate-y-5' : 'translate-y-0',
          )}
          key={theme}
        />
      ))}
    </button>
  );
}
