import type { Metadata } from "next";
import { Geist, Geist_Mono, Play } from "next/font/google";
import "./globals.css";

import App from "./_app";
import WatchPage from "@/components/watchPage";
import { Suspense } from "react";

import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const play = Play({
  variable: "--font-play",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Matrio",
    template: "%s | Matrio",
  },
  description: "Matrio is a casual online games platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${play.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <App>
            <Suspense fallback={null}>
              <WatchPage />
            </Suspense>
            {children}
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
}
