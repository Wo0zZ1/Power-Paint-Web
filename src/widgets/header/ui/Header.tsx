"use client";

import Link from "next/link";
import { useState } from "react";
import {
  EllipsisVertical,
  Languages,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { cn } from "@/utils";

import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

import {
  isLanguageSupported,
  SUPPORTED_LANGUAGES,
  SupportedLanguageCode,
} from "@/shared/i18n";

import { ROUTES, TOOLTIP_DELAY } from "@/shared/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface HeaderProps {
  className?: string;
}

// TODO SSR

export function Header(props: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [language, setLanguage] = useState<SupportedLanguageCode>("en");

  const handleChangeLanguage = (code: string) => {
    if (isLanguageSupported(code)) setLanguage(code);
  };

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
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>

                <Separator className="my-1" />

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="ml-auto">
                    <Languages />
                    Language
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent asChild className="w-40">
                      <DropdownMenuRadioGroup
                        value={language}
                        onValueChange={handleChangeLanguage}
                      >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <DropdownMenuRadioItem
                            key={lang.code}
                            value={lang.code}
                          >
                            {lang.nativeName}
                          </DropdownMenuRadioItem>
                        ))}
                        <DropdownMenuRadioItem value={"de"} disabled>
                          Deutsch
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value={"fr"} disabled>
                          Français
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem
                  asChild
                  onSelect={(e) => e.preventDefault()}
                  className="hover:bg-transparent focus:bg-transparent cursor-default"
                >
                  <div className="flex gap-4">
                    <label>Theme</label>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={theme === "light"}
                        onClick={() => setTheme("light")}
                      >
                        <Sun />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={theme === "dark"}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={theme === "system"}
                        onClick={() => setTheme("system")}
                      >
                        <Monitor />
                      </Button>
                    </ButtonGroup>
                  </div>
                </DropdownMenuItem>
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
                <DropdownMenuLabel>Account</DropdownMenuLabel>

                <DropdownMenuItem>
                  <Link href={ROUTES.PROFILE}>Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={ROUTES.SETTINGS}>Settings</Link>
                </DropdownMenuItem>

                <Separator className="my-1" />
              </DropdownMenuGroup>

              <DropdownMenuGroup>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="ml-auto">
                    <Languages />
                    Language
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent asChild className="w-40">
                      <DropdownMenuRadioGroup
                        value={language}
                        onValueChange={handleChangeLanguage}
                      >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <DropdownMenuRadioItem
                            key={lang.code}
                            value={lang.code}
                          >
                            {lang.nativeName}
                          </DropdownMenuRadioItem>
                        ))}
                        <DropdownMenuRadioItem value={"de"} disabled>
                          Deutsch
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value={"fr"} disabled>
                          Français
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem
                  asChild
                  onSelect={(e) => e.preventDefault()}
                  className="hover:bg-transparent focus:bg-transparent cursor-default"
                >
                  <div className="flex gap-4">
                    <label>Theme</label>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={theme === "light"}
                        onClick={() => setTheme("light")}
                      >
                        <Sun />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={theme === "dark"}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={theme === "system"}
                        onClick={() => setTheme("system")}
                      >
                        <Monitor />
                      </Button>
                    </ButtonGroup>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <Separator className="my-1" />

              <DropdownMenuItem
                onSelect={() => console.log("LogOut")}
                variant="destructive"
              >
                <LogOut />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* There is no session */}
          <Button className="group" size="lg" variant="secondary" asChild>
            <Link href={ROUTES.LOGIN}>
              Login
              <LogIn className="relative left-0 group-hover:left-1 transition-all" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
