import { NextRequest, NextResponse } from "next/server";

import { getSession, getAccessToWorkspace } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get("userId") || undefined;

  const workspaces = await prisma.workspace.findMany({
    where: { ownerId: userId },
    include: {
      boards: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const session = await getSession();

  const workspacesWithAccess = await Promise.all(
    workspaces.map(async (workspace) => {
      const access = await getAccessToWorkspace(workspace, session?.user);

      return { workspace, access };
    }),
  );

  const filteredWorkspacesWithAccess = workspacesWithAccess.filter(
    (w) => w.access.canView,
  );

  return NextResponse.json(filteredWorkspacesWithAccess);
};
