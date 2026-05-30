"use client";

import { BringToFront, MoveDown, MoveUp, SendToBack } from "lucide-react";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";

import { TOOLTIP_DELAY } from "@/shared/constants";
import {
  Button,
  ButtonGroup,
  Label,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui";

import type { PropertySectionProps } from "../../model";
import { useBoardStore } from "../../model";
import { PropertiesRow } from "../properties";

import { SidebarBlock } from "./SidebarBlock";

export function GroupingSection({}: PropertySectionProps) {
  const t = useTranslations("toolbar.sidebar");

  const { selectedIds, bringToFront, bringForward, sendBackward, sendToBack } =
    useBoardStore(
      useShallow((s) => ({
        selectedIds: s.selectedIds,
        bringToFront: s.bringToFront,
        bringForward: s.bringForward,
        sendBackward: s.sendBackward,
        sendToBack: s.sendToBack,
      })),
    );

  const disabled = selectedIds.size === 0;

  if (disabled) return null;

  return (
    <SidebarBlock title={t("grouping")}>
      <PropertiesRow>
        <Label className="text-xs text-muted-foreground">{t("order")}</Label>

        <ButtonGroup className="justify-end">
          <Tooltip delayDuration={TOOLTIP_DELAY} disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => bringToFront(selectedIds)}
              >
                <BringToFront className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("bring_to_front")}</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={TOOLTIP_DELAY} disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => bringForward(selectedIds)}
              >
                <MoveUp className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("bring_forward")}</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={TOOLTIP_DELAY} disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => sendBackward(selectedIds)}
              >
                <MoveDown className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("send_backward")}</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={TOOLTIP_DELAY} disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => sendToBack(selectedIds)}
              >
                <SendToBack className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("send_to_back")}</TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </PropertiesRow>

      {/* <PropertiesRow>
        <Label className="text-xs text-muted-foreground">{t("groups")}</Label>

        <div className="rounded-md border border-dashed border-border/60 bg-background/35 px-3 py-2 text-xs text-muted-foreground">
          {t("groups_empty")}
        </div>
      </PropertiesRow> */}
    </SidebarBlock>
  );
}
