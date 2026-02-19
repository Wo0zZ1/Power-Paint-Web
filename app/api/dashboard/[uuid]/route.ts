import { forbidden } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { WorkspaceType } from "@prisma/client/client";

import { prisma } from "@/shared/lib/prisma";
import { getSession } from "@/shared/lib/auth";

export const GET = async (request: NextRequest) => {
  const session = await getSession();

  if (!session) forbidden();

  let userWorkspaces = await prisma.workspace.findMany({
    where: { ownerId: session.user.id },
    include: { boards: true },
  });

  const personalWorkspace = userWorkspaces.find(
    (w) => w.type === WorkspaceType.personal,
  );
  userWorkspaces = userWorkspaces.filter(
    (w) => w.type !== WorkspaceType.personal,
  );

  if (!personalWorkspace)
    console.error(
      `Personal workspace for user id ${session.user.id} not found`,
    );

  return NextResponse.json({
    userWorkspaces,
    personalWorkspace,
  });
};
