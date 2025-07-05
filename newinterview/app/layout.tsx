import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ResponsiveThemeProvider } from '@/components/responsive-theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from '@/contexts/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InterviewAI - AI-Powered Interview Platform',
  description: 'Schedule and conduct AI-powered interviews with real-time feedback and analysis',
  authors: [{ name: 'InterviewAI Team' }],
  keywords: ['interview', 'AI', 'hiring', 'recruitment', 'job interview'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <ResponsiveThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ResponsiveThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}