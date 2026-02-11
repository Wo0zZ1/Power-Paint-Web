import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { SessionProvider } from "next-auth/react";

import { ClientProviders, ServerProviders } from "@/app/providers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable} antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <ServerProviders>
          <ClientProviders>
            <Header />
            {children}
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
