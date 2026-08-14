import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "./components/nav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kavin.me"),
  title: {
    default: "Kavin Desi Valli",
    template: "%s — Kavin Desi Valli",
  },
  description:
    "Kavin Desi Valli — software engineer and Computer Engineering student at the University of Waterloo. Currently at Replicas (YC P26); previously v0 at Vercel and Helicone.",
  openGraph: {
    title: "Kavin Desi Valli",
    description:
      "Software engineer at Replicas (YC P26). Previously v0 at Vercel and Helicone.",
    url: "https://kavin.me",
    siteName: "Kavin Desi Valli",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavin Desi Valli",
    description:
      "Software engineer at Replicas (YC P26). Previously v0 at Vercel and Helicone.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
