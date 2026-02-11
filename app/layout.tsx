import type { Metadata } from "next";

import { LayoutProvider } from "@/app/providers";

import { Header } from "@/widgets/header";

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
      className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable} dark antialiased`}
      lang="en"
    >
      <body>
        <LayoutProvider>
          <Header />
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
