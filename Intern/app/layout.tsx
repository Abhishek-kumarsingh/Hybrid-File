import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import AuthProvider from "@/context/AuthProvider";
import UserTestingProvider from "@/context/UserTestingProvider";
import AOSInitializer from "@/components/ui/AOSInitializer";
import KeyboardFocusOutline from "@/components/ui/design-system/KeyboardFocusOutline";
import SkipToContent from "@/components/ui/design-system/SkipToContent";

// For server-side rendering, we need to import AOS styles only
import "aos/dist/aos.css";

// Load Poppins font with multiple weights for better typography
const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Delhi Development Authority - Parks & Gardens",
  description: "Explore parks and green spaces managed by the Delhi Development Authority (DDA). Find information about parks, events, recreational activities, and green initiatives in Delhi.",
  keywords: "DDA, Delhi Development Authority, parks, gardens, green spaces, Delhi, recreation, outdoor activities, nature, environment",
  authors: [{ name: "Delhi Development Authority" }],
  creator: "Delhi Development Authority",
  publisher: "Delhi Development Authority",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dda-parks.gov.in"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "hi-IN": "/hi-IN",
    },
  },
  openGraph: {
    title: "Delhi Development Authority - Parks & Gardens",
    description: "Explore parks and green spaces managed by the Delhi Development Authority (DDA)",
    url: "https://dda-parks.gov.in",
    siteName: "DDA Parks & Gardens",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Delhi Development Authority Parks and Gardens",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delhi Development Authority - Parks & Gardens",
    description: "Explore parks and green spaces managed by the Delhi Development Authority (DDA)",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Parks and Recreation",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="logo.png" sizes="any" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <UserTestingProvider>
              {/* AOS Initializer for client-side animations */}
              <AOSInitializer />
              {/* Accessibility components */}
              <SkipToContent contentId="main-content" />
              <KeyboardFocusOutline />
              <main id="main-content">
                {children}
              </main>
            </UserTestingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
