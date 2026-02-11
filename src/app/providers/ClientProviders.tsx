"use client";

import { TooltipProvider } from "@/shared/ui/tooltip";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
