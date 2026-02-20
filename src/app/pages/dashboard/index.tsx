import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Board, Workspace, WorkspaceType } from "@prisma/client";

import { cn } from "@/utils";
import { ROUTES } from "@/shared/config";
import { Access, getSession } from "@/shared/lib/auth";

import {
  Card,
  CardContent,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";

import { WorkspacesCarouselBlock } from "@/widgets/workspaces-carousel";

export async function DashboardPage() {
  const session = await getSession();
  const cookieStore = await cookies();

  if (!session) redirect(ROUTES.LOGIN);

  const workspacesFetchData = (await fetch(
    `${process.env.NEXTAUTH_URL}/api/workspaces`,
    { headers: { Cookie: cookieStore.toString() } },
  ).then((res) => res.json())) as { workspace: Workspace; access: Access }[];

  const workspacesData = workspacesFetchData
    .filter(
      (workspaceData) => workspaceData.workspace.type === WorkspaceType.team,
    )
    .filter(
      (workspaceData) => workspaceData.workspace.ownerId === session.user.id,
    );

  const personalWorkspace = workspacesFetchData.find(
    (workspaceData) => (workspaceData.workspace.type = WorkspaceType.personal),
  )!.workspace;

  const boardsData = (await fetch(`${process.env.NEXTAUTH_URL}/api/boards`, {
    headers: { Cookie: cookieStore.toString() },
  }).then((res) => res.json())) as { board: Board; access: Access }[];

  const filteredBoardsFetchData = boardsData.filter(
    (boardData) => boardData.board.workspaceId === personalWorkspace.id,
  );

  // console.log(boardsData);
  // console.log(workspacesFetchData);

  if (!session) redirect(ROUTES.LOGIN);

  return (
    <div className={cn("w-full")}>
      <WorkspacesCarouselBlock />

      {/* Boards */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Boards</h3>
      {boardsData.length ? (
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="">
            {filteredBoardsFetchData.map(({ board, access }, index) => (
              <CarouselItem key={board.id} className="basis-1/3">
                <Link href={ROUTES.BOARD(board.id)}>
                  <Card className="aspect-video">
                    <CardHeader className="border-b">
                      <h4 className="text-lg font-medium">{board.name}</h4>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-muted-foreground">No boards found.</p>
      )}
    </div>
  );
}
