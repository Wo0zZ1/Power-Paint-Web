import { TooltipProvider } from "@/shared/ui/tooltip";
import { PropsWithChildren } from "react";

export function LayoutProvider({ children }: PropsWithChildren) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
