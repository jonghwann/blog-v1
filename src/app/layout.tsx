import { Metadata } from 'next';
import ThemeProvider from '@/providers/theme-provider';
import Layout from '@/components/layout/layout';

import '@/styles/global.css';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: '8xDBxjisJf8zvExurVacaEB03X9EM6aTA4B3v9bLi3E',
    other: {
      'naver-site-verification': '2a083bc985abfcfc26d841f19d0b6acb31d37f6e',
    },
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
