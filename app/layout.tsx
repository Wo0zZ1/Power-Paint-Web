import type { Metadata } from "next";

import { LayoutProvider } from "@/app/providers";

import { Header } from "@/widgets/header";
import { ThemeScript } from "@/features/theme-switcher/ui/ThemeScript";

import { geistMono, geistSans, interSans } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Power Paint",
    default: "Power Paint",
  },
  description: "A simple paint application built with React and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <LayoutProvider>
          <Header />
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
