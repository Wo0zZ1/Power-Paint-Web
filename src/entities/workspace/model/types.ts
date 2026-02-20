import type { Workspace } from "@prisma/client";
import type { Access } from "@/shared/lib/auth";

export interface WorkspaceWithAccess {
  workspace: Workspace;
  access: Access;
}
