import './global.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter as FontSans } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import OnchainProviders from '@/OnchainProviders';
import { ThemeProvider } from '@/ThemeProvider';
import { initAnalytics } from '@/utils/analytics';
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

// Stat analytics before the App renders,
// so we can track page views and early events1
initAnalytics();

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-1 flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
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
