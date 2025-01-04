'use client';
import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="icon-box">
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
