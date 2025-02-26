'use client';

import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dot, Monitor, Moon, Sun } from 'lucide-react';

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="icon-box shadow-none focus-visible:outline-none focus-visible:ring-0">
          <Sun className="block h-5 w-5 dark:hidden" />
          <Moon className="hidden h-5 w-5 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-background" align="end">
        {themeOptions.map(({ mode, icon }) => (
          <DropdownMenuItem className="cursor-pointer leading-normal" key={mode} onClick={() => setTheme(mode)}>
            {icon}
            {mode}
            {theme === mode && <Dot className="absolute right-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const themeOptions = [
  {
    mode: 'light',
    icon: <Sun />,
  },
  {
    mode: 'dark',
    icon: <Moon />,
  },
  {
    mode: 'system',
    icon: <Monitor />,
  },
];
