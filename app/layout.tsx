import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "lesenn",
    template: "%s | lesenn",
  },
  description: "minimal book tracking",
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
      <body className={`${geistMono.className} antialiased`}>
        <div className="flex flex-col min-h-screen p-8 md:pt-16">
          <main className="max-w-2xl mx-auto w-full space-y-8">{children}</main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
