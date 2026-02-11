import { cn } from "@/utils";

import { DropdownMenuItem } from "@/shared/ui";

import { ThemeSwitcher } from "./ThemeSwitcher";

interface ThemeSwitcherMenuItemProps {
  className?: string;
}

export function ThemeSwitcherMenuItem(props: ThemeSwitcherMenuItemProps) {
  return (
    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()}
      className={cn(
        "hover:bg-transparent focus:bg-transparent cursor-default",
        props.className,
      )}
    >
      <label className="mr-2">Theme</label>
      <ThemeSwitcher />
    </DropdownMenuItem>
  );
}
