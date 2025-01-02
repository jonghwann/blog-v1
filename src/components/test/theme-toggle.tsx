'use client';
import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-lg bg-gray-300 p-2 dark:bg-gray-600">
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
