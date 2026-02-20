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

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  const { uuid } = await params;

  const body = await request.json();

  const workspace = await prisma.workspace.findUnique({
    where: { id: uuid },
  });

  if (!workspace)
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

  const session = await getSession();

  const access = await getAccessToWorkspace(workspace, session?.user);

  if (!access.canEdit)
    return NextResponse.json(
      { error: "You do not have permission to edit this workspace" },
      { status: 403 },
    );

  const updatedWorkspace = await prisma.workspace.update({
    where: { id: uuid },
    data: {
      accessLevel: body.accessLevel,
      name: body.name,
      ownerId: body.ownerId,
      type: body.type,
    },
  });

  return NextResponse.json({ workspace: updatedWorkspace, access });
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  const { uuid } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: uuid },
  });

  if (!workspace)
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

  const session = await getSession();

  const access = await getAccessToWorkspace(workspace, session?.user);

  if (!access.canDelete)
    return NextResponse.json(
      { error: "You do not have permission to delete this workspace" },
      { status: 403 },
    );

  const updatedWorkspace = await prisma.workspace.delete({
    where: { id: uuid },
  });

  return NextResponse.json({ workspace: updatedWorkspace, access });
};
