import './global.css';

import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import OnchainProviders from '@/OnchainProviders';
import { ThemeProvider } from '@/ThemeProvider';

import type { Metadata } from 'next';

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-1 flex-col bg-background antialiased',
          GeistSans.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OnchainProviders>{children}</OnchainProviders>
          <Toaster richColors theme="light" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
