import { NextRequest, NextResponse } from "next/server";

import { getAccessToWorkspace, getSession } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  const { uuid } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: uuid },
    include: {
      boards: true,
    },
  });

  if (!workspace)
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

  const session = await getSession();

  const access = await getAccessToWorkspace(workspace, session?.user);

  if (!access.canView)
    return NextResponse.json(
      { error: "You do not have access to this workspace" },
      { status: 403 },
    );

  return NextResponse.json({ workspace, access });
};
