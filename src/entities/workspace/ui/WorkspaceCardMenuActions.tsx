"use client";

import { Edit2Icon, Share2, Trash2 } from "lucide-react";

import { AccessRole } from "@/shared/constants";

import { DropdownMenuGroup, DropdownMenuItem, Separator } from "@/shared/ui";

interface WorkspaceCardMenuActionsProps {
  accessRole: AccessRole;
  onEditWorkspaceName?: () => void;
  onEditWorkspaceAccess?: () => void;
  onDeleteWorkspace?: () => void;
}

export function WorkspaceCardMenuActions({
  accessRole,
  onEditWorkspaceName,
  onEditWorkspaceAccess,
  onDeleteWorkspace,
}: WorkspaceCardMenuActionsProps) {
  return (
    <>
      <DropdownMenuGroup>
        {AccessRole[accessRole] >= AccessRole.ADMIN && (
          <DropdownMenuItem onSelect={onEditWorkspaceName}>
            <Edit2Icon />
            Edit Name
          </DropdownMenuItem>
        )}

        {AccessRole[accessRole] >= AccessRole.ADMIN && (
          <DropdownMenuItem onSelect={onEditWorkspaceAccess}>
            <Share2 />
            Share
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>

      {AccessRole[accessRole] >= AccessRole.OWNER && (
        <>
          <Separator className="my-1" />

          <DropdownMenuItem onSelect={onDeleteWorkspace} variant="destructive">
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </>
      )}
    </>
  );
}
