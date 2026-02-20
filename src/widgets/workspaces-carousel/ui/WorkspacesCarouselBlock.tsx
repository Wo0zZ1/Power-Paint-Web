import Link from "next/link";
import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ROUTES } from "@/shared/config";
import { getQueryClient } from "@/shared/api";

import { Button } from "@/shared/ui";

import { getWorkspacesQueryOptions } from "@/entities/workspace/server";

import { WorkspacesCarousel } from "./WorkspacesCarousel";

interface WorkspacesCarouselBlockProps {}

export async function WorkspacesCarouselBlock({}: WorkspacesCarouselBlockProps) {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();

  await queryClient.prefetchQuery(
    getWorkspacesQueryOptions(cookieStore.toString()),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex justify-between items-end mt-8 mb-4">
        <h3 className="text-2xl font-semibold ">Workspaces</h3>
        <Button size="xs" variant="link" className="text-sm" asChild>
          <Link href={ROUTES.DASHBOARD.WORKSPACES}>View all</Link>
        </Button>
      </div>

      <WorkspacesCarousel />
    </HydrationBoundary>
  );
}
