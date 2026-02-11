"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { EllipsisVertical, LogIn, LogOut } from "lucide-react";

import { cn } from "@/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { ROUTES, TOOLTIP_DELAY } from "@/shared/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

import { ThemeSwitcherMenuItem, useTheme } from "@/features/theme-switcher";
import { LanguageSwitcherMenuItem } from "@/features/language-switcher";

interface HeaderProps {
  className?: string;
}

// TODO SSR

export function Header(props: HeaderProps) {
  const {} = useTheme();

  const t = useTranslations();

  return (
    <header
      className={cn(
        props.className,
        "sticky top-0 z-50 h-18 w-full bg-background",
      )}
    >
      <div className="flex container mx-auto h-full px-4 items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.ROOT}>
          <h1 className="text-3xl">PowerPaint</h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Settings button */}
          <DropdownMenu>
            <Tooltip delayDuration={TOOLTIP_DELAY} disableHoverableContent>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    size="icon-lg"
                    variant="outline"
                  >
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("settings.title")}</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{t("settings.title")}</DropdownMenuLabel>

                <Separator className="my-1" />

                <LanguageSwitcherMenuItem />

                <ThemeSwitcherMenuItem />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Button */}
          {/* There is a session */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer" size="lg">
                <AvatarImage src="/avatar.png" alt="User Avatar" />
                <AvatarFallback>W</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{"Wo0zZ1"}</DropdownMenuLabel>
              </DropdownMenuGroup>

              <Separator className="my-1" />

              <DropdownMenuGroup>
                <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>

                <DropdownMenuItem>
                  <Link href={ROUTES.PROFILE}>{t("profile")}</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={ROUTES.SETTINGS}>{t("settings.title")}</Link>
                </DropdownMenuItem>

                <Separator className="my-1" />
              </DropdownMenuGroup>

              <DropdownMenuGroup>
                <DropdownMenuLabel>{t("settings.title")}</DropdownMenuLabel>

                <LanguageSwitcherMenuItem />

                <ThemeSwitcherMenuItem />
              </DropdownMenuGroup>

              <Separator className="my-1" />

              <DropdownMenuItem
                onSelect={() => console.log("LogOut")}
                variant="destructive"
              >
                <LogOut />
                {t("auth.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* There is no session */}
          <Button className="group" size="lg" variant="secondary" asChild>
            <Link href={ROUTES.LOGIN}>
              {t("auth.login")}
              <LogIn className="relative left-0 group-hover:left-1 transition-all" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
