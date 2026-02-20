"use client";

import { Settings } from "lucide-react";

import { AccessRole } from "@/shared/constants";

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
  accessRole: AccessRole;
  onEditWorkspaceName?: () => void;
  onEditWorkspaceAccess?: () => void;
  onDeleteWorkspace?: () => void;
}

export function WorkspaceCardSettingsMenu({
  accessRole,
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
          accessRole={accessRole}
          onEditWorkspaceName={onEditWorkspaceName}
          onEditWorkspaceAccess={onEditWorkspaceAccess}
          onDeleteWorkspace={onDeleteWorkspace}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
