import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "lesenn | minimalist reading tracker",
    template: "%s | lesenn",
  },
  description: "Track your reading progress without distractions. A minimal book tracking app for people who want to focus on reading, not managing complex features.",
  keywords: [
    "book tracker",
    "reading tracker",
    "track reading progress",
    "minimalist book tracker",
    "reading log app",
    "book tracking website",
    "reading habit tracker",
    "how to track books read",
    "simple reading tracker",
    "minimal book tracking",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.lesenn.com",
    siteName: "lesenn",
    title: "lesenn | minimalist reading tracker",
    description: "Track your reading progress without distractions. A minimal book tracking app for people who want to focus on reading, not managing complex features.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "lesenn - minimalist reading tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "lesenn | minimalist reading tracker",
    description: "Track your reading progress without distractions. A minimal book tracking app.",
    images: ["/opengraph-image.png"],
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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Script
        src="https://cdn.seline.so/seline.js"
        data-token="c1ce0ee3190c90a" // can be found at General settings
        strategy="afterInteractive"
      />
      <body className={`${geistMono.className} antialiased`}>
        <div className="flex flex-col min-h-screen p-6 md:pt-12">
          <main className="max-w-2xl mx-auto w-full space-y-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
