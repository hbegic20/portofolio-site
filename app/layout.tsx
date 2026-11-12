import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { LiteModeDetector } from "@/components/layout/LiteModeDetector";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { profile } from "@/content/profile";
import { isPlaceholder, sameAs, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: siteUrl.href }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl.href,
  ...(sameAs.length > 0 && { sameAs }),
  ...(!isPlaceholder(profile.location) && { homeLocation: profile.location }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SkipToContent />
        {children}
        <CommandPalette />
        <LiteModeDetector />
        <LenisProvider />
        <Analytics />
        <script
          type="application/ld+json"
          // Static object from content/ — escape "<" so it can never close the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
