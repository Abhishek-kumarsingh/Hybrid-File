import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { PreferencesProvider } from '@/contexts/PreferencesContext';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://threatzone.com'),
  title: 'ThreatZone Prediction System',
  description: 'Comprehensive IoT-based threat detection and prediction system for monitoring critical infrastructure',
  keywords: ['IoT', 'threat detection', 'prediction', 'monitoring', 'infrastructure', 'security'],
  authors: [{ name: 'ThreatZone Team' }],
  creator: 'ThreatZone',
  publisher: 'ThreatZone',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://threatzone.com',
    title: 'ThreatZone Prediction System',
    description: 'Comprehensive IoT-based threat detection and prediction system',
    siteName: 'ThreatZone',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ThreatZone Prediction System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThreatZone Prediction System',
    description: 'Comprehensive IoT-based threat detection and prediction system',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreferencesProvider>
            <QueryProvider>
              <SocketProvider>
                {children}
                <Toaster
                  position="top-right"
                  expand={true}
                  richColors
                  closeButton
                />
              </SocketProvider>
            </QueryProvider>
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
