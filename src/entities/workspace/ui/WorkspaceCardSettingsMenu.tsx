"use client";

import { Settings } from "lucide-react";

import { Access } from "@/shared/lib/auth";

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  Separator,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
} from "@/shared/ui";

import { WorkspaceCardMenuActions } from "./WorkspaceCardMenuActions";

interface WorkspaceCardSettingsMenuProps {
  access: Access;
  onEditWorkspaceName?: () => void;
  onEditWorkspaceAccess?: () => void;
  onDeleteWorkspace?: () => void;
}

export function WorkspaceCardSettingsMenu({
  access,
  onEditWorkspaceName,
  onEditWorkspaceAccess,
  onDeleteWorkspace,
}: WorkspaceCardSettingsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-sm"
          variant="secondary"
          className="absolute z-100 top-4 right-4"
        >
          <Settings />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Workspace Actions</DropdownMenuLabel>

        <Separator className="my-1" />

        <WorkspaceCardMenuActions
          access={access}
          onEditWorkspaceName={onEditWorkspaceName}
          onEditWorkspaceAccess={onEditWorkspaceAccess}
          onDeleteWorkspace={onDeleteWorkspace}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
