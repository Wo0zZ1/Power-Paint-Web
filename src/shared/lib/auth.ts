import {
  AccessLevel,
  Board,
  MemberRole,
  Workspace,
  WorkspaceMember,
} from "@prisma/client";
import { getServerSession, Session } from "next-auth";

import { AUTH_CONFIG } from "../config/authConfig";
import { prisma } from "./prisma";

export const getSession = () => getServerSession(AUTH_CONFIG);

export type Access = {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

export const getAccessToWorkspace = async (
  workspace: Workspace,
  user?: Session["user"],
): Promise<Access> => {
  if (user && user.id === workspace.ownerId)
    return { canView: true, canEdit: true, canDelete: true };

  const workspaceMember = user
    ? await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: { workspaceId: workspace.id, userId: user.id },
        },
      })
    : null;

  if (workspaceMember) {
    switch (workspaceMember.role) {
      case MemberRole.admin:
        return { canView: true, canEdit: true, canDelete: true };
      case MemberRole.editor:
        return { canView: true, canEdit: true, canDelete: false };
      case MemberRole.viewer:
        return { canView: true, canEdit: false, canDelete: false };
      default:
        return { canView: false, canEdit: false, canDelete: false };
    }
  }

  switch (workspace.accessLevel) {
    case AccessLevel.private:
      return { canView: false, canEdit: false, canDelete: false };
    case AccessLevel.public_view:
      return { canView: true, canEdit: false, canDelete: false };
    case AccessLevel.public_edit:
      return { canView: true, canEdit: true, canDelete: false };
    default:
      return { canView: false, canEdit: false, canDelete: false };
  }
};

export const getAccessToBoard = async (
  board: Board,
  user?: Session["user"],
): Promise<Access> => {
  if (user && user.id === board.ownerId)
    return { canView: true, canEdit: true, canDelete: true };

  const workspace = await prisma.workspace.findUnique({
    where: { id: board.workspaceId },
  });
  if (!workspace) return { canView: false, canEdit: false, canDelete: false };

  if (user && user.id === workspace.ownerId)
    return { canView: true, canEdit: true, canDelete: true };

  const boardMember = user
    ? await prisma.boardMember.findUnique({
        where: { boardId_userId: { boardId: board.id, userId: user.id } },
      })
    : null;

  const workspaceMember = user
    ? await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: { workspaceId: workspace.id, userId: user.id },
        },
      })
    : null;

  if (boardMember || workspaceMember) {
    if (
      boardMember?.role === MemberRole.admin ||
      workspaceMember?.role === MemberRole.admin
    ) {
      return { canView: true, canEdit: true, canDelete: true };
    } else if (
      boardMember?.role === MemberRole.editor ||
      workspaceMember?.role === MemberRole.editor
    ) {
      return { canView: true, canEdit: true, canDelete: false };
    } else if (
      boardMember?.role === MemberRole.viewer ||
      workspaceMember?.role === MemberRole.viewer
    ) {
      return { canView: true, canEdit: false, canDelete: false };
    } else return { canView: false, canEdit: false, canDelete: false };
  }

  if (
    board.accessLevel === AccessLevel.public_edit ||
    workspace.accessLevel === AccessLevel.public_edit
  ) {
    return { canView: true, canEdit: true, canDelete: false };
  } else if (
    board.accessLevel === AccessLevel.public_view ||
    workspace.accessLevel === AccessLevel.public_view
  ) {
    return { canView: true, canEdit: false, canDelete: false };
  } else {
    return { canView: false, canEdit: false, canDelete: false };
  }
};
