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
    default: "lesenn | minimal book tracking",
    template: "%s | lesenn",
  },
  description: "minimal book tracking",
  keywords: ["book", "tracking", "minimal", "lesen"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.lesenn.com",
    title: "lesenn",
    description: "minimal book tracking",
  },
  twitter: {
    title: "lesenn",
    description: "minimal book tracking",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
