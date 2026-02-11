"use client";

import { SessionProvider } from "next-auth/react";

import { TooltipProvider } from "@/shared/ui/tooltip";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
