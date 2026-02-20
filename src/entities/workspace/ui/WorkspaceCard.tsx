import { Workspace } from "@prisma/client";

import { cn } from "@/utils";
import { Access } from "@/shared/lib/auth";

import { Card } from "@/shared/ui";

import { WorkspaceCardBadge } from "./WorkspaceCardBadge";
import { WorkspaceCardImage } from "./WorkspaceCardImage";
import { WorkspaceCardHeader } from "./WorkspaceCardHeader";
import { WorkspaceCardFooter } from "./WorkspaceCardFooter";
import { WorkspaceCardSettingsMenu } from "./WorkspaceCardSettingsMenu";

import preview1 from "../../../../public/assets/preview1.jpeg"; // TODO Remove this hardcoded preview image

interface WorkspaceCardProps {
  workspace: Workspace;
  access: Access;
  onEditWorkspaceName?: (workspace: Workspace) => void;
  onEditWorkspaceAccess?: (workspace: Workspace) => void;
  onDeleteWorkspace?: (workspace: Workspace) => void;
  className?: string;
}

export function WorkspaceCard({
  workspace,
  access,
  onEditWorkspaceName,
  onEditWorkspaceAccess,
  onDeleteWorkspace,
  className,
}: WorkspaceCardProps) {
  return (
    <Card
      className={cn("select-text relative h-full overflow-hidden", className)}
    >
      <WorkspaceCardBadge type={workspace.accessLevel} />

      <WorkspaceCardSettingsMenu
        access={access}
        onEditWorkspaceName={() => onEditWorkspaceName?.(workspace)}
        onEditWorkspaceAccess={() => onEditWorkspaceAccess?.(workspace)}
        onDeleteWorkspace={() => onDeleteWorkspace?.(workspace)}
      />

      <WorkspaceCardImage workspaceId={workspace.id} imageProps={preview1} />

      <WorkspaceCardHeader name={workspace.name} />

      <WorkspaceCardFooter workspaceId={workspace.id} />
    </Card>
  );
}
