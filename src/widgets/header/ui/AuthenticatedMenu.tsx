"use client";

import type { Session } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/shared/config";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuItem,
  DropdownMenu,
  Separator,
} from "@/shared/ui";

import { LanguageSwitcherMenuItem } from "@/features/language-switcher";
import { ThemeSwitcherMenuItem } from "@/features/theme-switcher";

import { ButtonAvatar } from "./ButtonAvatar";

interface AuthenticatedMenuProps {
  session: Session;
}

export function AuthenticatedMenu({ session }: AuthenticatedMenuProps) {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ButtonAvatar
          fallback={session?.user?.email?.toUpperCase() ?? "User"}
          src="/assets/avatar.png"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            {session?.user?.email ?? "User"}
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <Separator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>

          <DropdownMenuLinkItem href={ROUTES.PROFILE}>
            {t("profile")}
          </DropdownMenuLinkItem>

          <DropdownMenuLinkItem href={ROUTES.SETTINGS}>
            {t("settings.title")}
          </DropdownMenuLinkItem>
        </DropdownMenuGroup>

        <Separator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("settings.title")}</DropdownMenuLabel>

          <LanguageSwitcherMenuItem />

          <ThemeSwitcherMenuItem />
        </DropdownMenuGroup>

        <Separator className="my-1" />

        <DropdownMenuItem
          onSelect={() => signOut({ callbackUrl: ROUTES.ROOT })}
          variant="destructive"
        >
          <LogOut />
          {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
