"use client";

import { Edit2Icon, Share2, Trash2 } from "lucide-react";

import { Access } from "@/shared/lib/auth";

import { DropdownMenuGroup, DropdownMenuItem, Separator } from "@/shared/ui";

interface WorkspaceCardMenuActionsProps {
  access: Access;
  onEditWorkspaceName?: () => void;
  onEditWorkspaceAccess?: () => void;
  onDeleteWorkspace?: () => void;
}

export function WorkspaceCardMenuActions({
  access,
  onEditWorkspaceName,
  onEditWorkspaceAccess,
  onDeleteWorkspace,
}: WorkspaceCardMenuActionsProps) {
  return (
    <>
      <DropdownMenuGroup>
        {access.canEdit && (
          <DropdownMenuItem onSelect={onEditWorkspaceName}>
            <Edit2Icon />
            Edit Name
          </DropdownMenuItem>
        )}

        {access.canEdit && (
          <DropdownMenuItem onSelect={onEditWorkspaceAccess}>
            <Share2 />
            Share
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>

      <Separator className="my-1" />

      {access.canDelete && (
        <DropdownMenuItem onSelect={onDeleteWorkspace} variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      )}
    </>
  );
}
