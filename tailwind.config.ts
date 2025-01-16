import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',

        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        secondary: {
          background: 'var(--secondary-background)',
          foreground: 'var(--secondary-foreground)',
        },

        contrast: {
          background: 'var(--contrast-background)',
          foreground: 'var(--contrast-foreground)',
        },
      },
      zIndex: {
        header: '50',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
