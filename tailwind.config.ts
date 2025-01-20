import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
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

        tertiary: {
          foreground: 'var(--tertiary-foreground)',
        },

        accent: 'var(--accent)',

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
