import { Metadata } from 'next';

import { sharedMetadata } from './shared-metadata';

import ThemeProvider from '@/providers/theme-provider';
import Layout from '@/layout/layout';

import '@/styles/global.css';

export const metadata: Metadata = {
  icons: {
    icon: sharedMetadata.icons.icon,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
