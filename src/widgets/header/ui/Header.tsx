"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { EllipsisVertical, LogIn, LogOut } from "lucide-react";

import { cn } from "@/utils";

import {
  Separator,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/shared/ui";

import { ROUTES, TOOLTIP_DELAY } from "@/shared/config";

import { ThemeSwitcherMenuItem, useTheme } from "@/features/theme-switcher";
import { LanguageSwitcherMenuItem } from "@/features/language-switcher";
import { signIn, signOut, useSession } from "next-auth/react";
import { ButtonAvatar } from "./ButtonAvatar";

interface HeaderProps {
  className?: string;
}

// TODO SSR

export function Header(props: HeaderProps) {
  const {} = useTheme(); // TODO Нужно для корректной работы переключения темы при SSR, иначе возникает рассинхронизация между сервером и клиентом

  const { data: session, status } = useSession();

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
          {/* Profile */}
          {status === "loading" && <ButtonAvatar nickname="User" loading />}

          {status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ButtonAvatar
                  nickname={session?.user?.name ?? "User"}
                  src="/assets/avatar.png"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    {session?.user?.name ?? "User"}
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
          )}

          {status === "unauthenticated" && (
            <>
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
              <Button className="group" size="lg" variant="secondary" asChild>
                <Button onClick={() => signIn()}>
                  {t("auth.login")}
                  <LogIn className="relative left-0 group-hover:left-1 transition-all" />
                </Button>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
