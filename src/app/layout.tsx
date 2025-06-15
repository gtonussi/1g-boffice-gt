import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/providers";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Back-office app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
