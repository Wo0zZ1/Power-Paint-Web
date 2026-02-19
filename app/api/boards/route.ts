import { NextRequest, NextResponse } from "next/server";

import { getSession, getAccessToBoard } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get("userId") || undefined;

  const boards = await prisma.board.findMany({
    where: { ownerId: userId },
  });

  const session = await getSession();

  const boardsWithAccess = await Promise.all(
    boards.map(async (board) => {
      const access = await getAccessToBoard(board, session?.user);

      return { board, access };
    }),
  );

  const filteredBoardsWithAccess = boardsWithAccess.filter(
    (b) => b.access.canView,
  );

  return NextResponse.json(filteredBoardsWithAccess);
};
