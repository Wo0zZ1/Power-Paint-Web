import { notFound, redirect } from "next/navigation";

import { getSession } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { ROUTES } from "@/shared/config";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  const workspace = await prisma.workspace.findFirst({
    where: { id: uuid },
  });

  if (!workspace) notFound();

  const session = await getSession();

  // check rights
  const hasAccess = false;

  if (!hasAccess) redirect(ROUTES.DASHBOARD);
}
