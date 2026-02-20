"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { Workspace } from "@prisma/client";

import { cn } from "@/utils";

import {
  Field,
  Input,
  Button,
  Dialog,
  FieldGroup,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  Spinner,
} from "@/shared/ui";

import { useDeleteWorkspaceMutation } from "@/entities/workspace/model/mutations";

interface DeleteWorkspaceModalProps {
  workspace?: Workspace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function DeleteWorkspaceModal({
  workspace,
  open,
  onOpenChange,
  className,
}: DeleteWorkspaceModalProps) {
  const deleteWorkspaceMutation = useDeleteWorkspaceMutation();

  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [isMutating, setIsMutating] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setWorkspaceName("");
  }, [open, setWorkspaceName]);

  const handleDeleteWorkspace = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!workspace) return;

    setIsMutating(true);

    deleteWorkspaceMutation.mutateAsync(workspace.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onSettled: () => {
        setIsMutating(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-lg!", className)}>
        <form className="flex flex-col gap-4" onSubmit={handleDeleteWorkspace}>
          <DialogHeader>
            <DialogTitle>Delete Workspace</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workspace?
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field className="gap-2">
              <label
                className="leading-none font-medium cursor-text"
                htmlFor="workspace-name"
              >
                To confirm, type &quot;<strong>{workspace?.name}</strong>&quot;
                in the field below
              </label>
              <Input
                id="workspace-name"
                name="workspace-name"
                className="border-destructive"
                placeholder="Enter workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={workspaceName !== workspace?.name || isMutating}
              className="transition-colors"
              variant="destructive"
              type="submit"
            >
              {isMutating && <Spinner />}
              Delete Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
