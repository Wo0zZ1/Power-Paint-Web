"use client";

import { SessionProvider } from "next-auth/react";

import { TooltipProvider } from "@/shared/ui/tooltip";
import { useTheme } from "@/features/theme-switcher";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const {} = useTheme(); // TODO Нужно для корректной работы переключения темы при SSR, иначе возникает рассинхронизация между сервером и клиентом

  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
