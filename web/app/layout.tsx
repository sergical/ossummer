import './global.css';

import { Analytics } from '@vercel/analytics/react';
import { Inter as FontSans } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import OnchainProviders from '@/OnchainProviders';
import { ThemeProvider } from '@/ThemeProvider';

import { inter } from './fonts';
import type { Metadata } from 'next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  other: {
    boat: '0.17.0',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-1 flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <svg width="0" height="0" className="hidden">
          <defs>
            <linearGradient id="ossummer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="12.58%" stopColor="#FAB851" />
              <stop offset="50%" stopColor="#FC80F5" />
              <stop offset="87.42%" stopColor="#FA3C0D" />
            </linearGradient>
          </defs>
        </svg>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OnchainProviders>{children}</OnchainProviders>
          <Toaster richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
