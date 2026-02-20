"use client";

import { useState } from "react";
import { Workspace } from "@prisma/client";

import { cn } from "@/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/shared/ui";

import { WorkspaceCard, useGetWorkspacesQuery } from "@/entities/workspace";

import { RenameWorkspaceModal } from "@/features/rename-workspace";
import { DeleteWorkspaceModal } from "@/features/delete-workspace";
import { ChangeWorkspaceAccessModal } from "@/features/change-workspace-access";

interface WorkspacesCarouselProps {
  className?: string;
}

export function WorkspacesCarousel({ className }: WorkspacesCarouselProps) {
  const { data, isLoading, isError, error } = useGetWorkspacesQuery();

  // Modal states
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [
    isChangeWorkspaceAccessModalOpen,
    setIsChangeWorkspaceAccessModalOpen,
  ] = useState<boolean>(false);
  const [isDeleteWorkspaceModalOpen, setIsDeleteWorkspaceModalOpen] =
    useState<boolean>(false);

  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );

  const handleChangeWorkspaceName = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setIsRenameModalOpen(true);
  };

  const handleChangeWorkspaceAccess = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setIsChangeWorkspaceAccessModalOpen(true);
  };

  const handleWorkspaceDelete = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setIsDeleteWorkspaceModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <Carousel opts={{ dragFree: true }} className={cn("", className)}>
        <CarouselContent>
          {data?.map(({ workspace, access }) => (
            <CarouselItem
              key={workspace.id}
              className="basis-1/1 xs:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
            >
              <WorkspaceCard
                workspace={workspace}
                access={access}
                onEditWorkspaceName={handleChangeWorkspaceName}
                onEditWorkspaceAccess={handleChangeWorkspaceAccess}
                onDeleteWorkspace={handleWorkspaceDelete}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="secondary"
          className="bg-secondary/75 left-6 size-10"
        />

        <CarouselNext
          variant="secondary"
          className="bg-secondary/75 right-6 size-10"
        />
      </Carousel>

      <RenameWorkspaceModal
        workspace={selectedWorkspace!}
        open={isRenameModalOpen}
        onOpenChange={setIsRenameModalOpen}
      />

      <ChangeWorkspaceAccessModal
        workspace={selectedWorkspace}
        open={isChangeWorkspaceAccessModalOpen}
        onOpenChange={setIsChangeWorkspaceAccessModalOpen}
      />

      <DeleteWorkspaceModal
        workspace={selectedWorkspace}
        open={isDeleteWorkspaceModalOpen}
        onOpenChange={setIsDeleteWorkspaceModalOpen}
      />
    </>
  );
}
