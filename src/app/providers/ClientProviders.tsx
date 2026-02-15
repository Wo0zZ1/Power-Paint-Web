"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import { TooltipProvider } from "@/shared/ui/tooltip";
import { useTheme } from "@/features/theme-switcher";

interface ClientProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export function ClientProviders({ children, session }: ClientProvidersProps) {
  const {} = useTheme(); // TODO Нужно для корректной работы переключения темы при SSR, иначе возникает рассинхронизация между сервером и клиентом

  return (
    <SessionProvider session={session}>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
