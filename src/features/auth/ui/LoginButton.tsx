"use client";

import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@/shared/ui";
import { ROUTES } from "@/shared/config";

interface LoginButtonProps {
  className?: string;
}

export function LoginButton({ className }: LoginButtonProps) {
  const t = useTranslations("auth");

  return (
    <Button
      size="lg"
      className={cn("group", className)}
      variant="secondary"
      onClick={() =>
        signIn(undefined, {
          redirect: true,
          callbackUrl: ROUTES.DASHBOARD.ROOT,
        })
      }
    >
      {t("login")}
      <LogIn className="relative left-0 group-hover:left-1 transition-all" />
    </Button>
  );
}
