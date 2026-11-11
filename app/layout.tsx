import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SkipToContent } from "@/components/layout/SkipToContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "[Name] — Full-stack engineer",
  description: "[One-line description of what you build.]",
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}
