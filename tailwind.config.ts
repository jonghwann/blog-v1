import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
      },
      zIndex: {
        header: '50',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
