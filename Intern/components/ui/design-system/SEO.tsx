"use client";

import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | "book";
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
  children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Delhi Development Authority Parks",
  description = "Explore Delhi's beautiful parks and gardens maintained by the Delhi Development Authority. Find information about parks, events, and recreational activities.",
  keywords = ["Delhi parks", "DDA parks", "Delhi gardens", "green spaces", "recreation", "Delhi"],
  ogImage = "/images/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noIndex = false,
  structuredData,
  children,
}) => {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dda-parks.gov.in";
  const fullUrl = canonicalUrl || `${baseUrl}${pathname}`;
  const fullOgImageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;
  
  // Format structured data
  const structuredDataString = structuredData
    ? JSON.stringify(structuredData)
    : JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Delhi Development Authority",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          "https://www.facebook.com/ddaofficial",
          "https://twitter.com/official_dda",
          "https://www.instagram.com/dda_official",
        ],
      });

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="Delhi Development Authority Parks" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@official_dda" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />
      
      {/* No Index if specified */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#006838" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {children}
    </Head>
  );
};

export default SEO;
