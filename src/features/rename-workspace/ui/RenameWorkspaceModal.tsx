"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { Workspace } from "@prisma/client";

import { cn } from "@/utils";

import {
  Label,
  Field,
  Input,
  Dialog,
  Button,
  FieldGroup,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  Spinner,
} from "@/shared/ui";

import { useUpdateWorkspaceMutation } from "@/entities/workspace";

interface RenameWorkspaceModalProps {
  workspace?: Workspace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function RenameWorkspaceModal({
  workspace,
  open,
  onOpenChange,
  className,
}: RenameWorkspaceModalProps) {
  const updateWorkspaceMutation = useUpdateWorkspaceMutation();

  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [isMutating, setIsMutating] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setWorkspaceName(workspace!.name);
  }, [open, setWorkspaceName, workspace]);

  const handleRenameWorkspace = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!workspace) return;

    setIsMutating(true);

    updateWorkspaceMutation.mutate(
      {
        id: workspace.id,
        name: workspaceName,
      },
      {
        onSuccess() {
          onOpenChange(false);
        },
        onSettled: () => {
          setIsMutating(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("", className)}>
        <form className="flex flex-col gap-4" onSubmit={handleRenameWorkspace}>
          <DialogHeader>
            <DialogTitle>Edit Workspace Name</DialogTitle>
            <DialogDescription>
              Enter a new name for this workspace.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                autoComplete="off"
                id="workspace-name"
                name="workspace-name"
                placeholder="Enter new workspace name"
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
              disabled={workspaceName === workspace?.name || isMutating}
              className="transition-colors"
              data-icon="inline-start"
              type="submit"
            >
              {isMutating && <Spinner />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
