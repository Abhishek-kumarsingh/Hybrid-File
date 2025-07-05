import type { Metadata } from "next";
import "./globals.css";
import './assets/css/styles.css'
import './assets/css/colors.css'
import './assets/css/modern-colors.css'

export const metadata: Metadata = {
  title: "HomeVista - Modern Real Estate Platform",
  description: "Find your dream property with HomeVista - The modern real estate platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="blue-skin">
        {children}
      </body>
    </html>
  );
}
