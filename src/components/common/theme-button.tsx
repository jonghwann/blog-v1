'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const icons = [
  { Icon: Moon, theme: 'dark' },
  { Icon: Sun, theme: 'light' },
];

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = () => {
    document.documentElement.classList.add('transitions-limited');
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    setTimeout(() => {
      document.documentElement.classList.remove('transitions-limited');
    }, 120);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button className='size-5 cursor-pointer overflow-hidden' type='button' onClick={handleClick}>
      {icons.map(({ Icon, theme }) => (
        <Icon
          className={cn(
            'size-5 text-secondary-foreground transition-transform duration-300 ease-in-out hover:text-foreground',
            resolvedTheme === 'dark' ? '-translate-y-5' : 'translate-y-0',
          )}
          key={theme}
        />
      ))}
    </button>
  );
}
