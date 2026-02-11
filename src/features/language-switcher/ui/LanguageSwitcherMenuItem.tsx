"use client";

import { useLocale } from "next-intl";

import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
} from "@/shared/ui";

import { LanguageList } from "./LanguageList";
import { LanguageTrigger } from "./LanguageTrigger";
import { changeLocaleAction } from "../actions/changeLocaleAction";

interface LanguageSwitcherMenuItemProps {
  className?: string;
}

export function LanguageSwitcherMenuItem(props: LanguageSwitcherMenuItemProps) {
  const locale = useLocale();

  return (
    <DropdownMenuSub>
      <LanguageTrigger />

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <LanguageList locale={locale} onValueChange={changeLocaleAction} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
