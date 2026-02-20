"use client";

import { SubmitEvent, useEffect } from "react";
import { Workspace } from "@prisma/client";

import { cn } from "@/utils";

import {
  Field,
  Input,
  Label,
  Button,
  Dialog,
  FieldGroup,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/shared/ui";

interface ChangeWorkspaceAccessModalProps {
  workspace?: Workspace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

// TODO Implement actual access level changing functionality
export function ChangeWorkspaceAccessModal({
  workspace,
  open,
  onOpenChange,
  className,
}: ChangeWorkspaceAccessModalProps) {
  useEffect(() => {}, [open, workspace]);

  const handleChangeWorkspaceAccess = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO Implement access level changing logic
    console.log("Change workspace access");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("", className)}>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleChangeWorkspaceAccess}
        >
          <DialogHeader>
            <DialogTitle>Edit Workspace Access</DialogTitle>
            <DialogDescription>
              Update the access settings for this workspace.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="workspace-access">Workspace Access</Label>
              <Input
                id="workspace-access"
                name="workspace-access"
                placeholder="Enter workspace access"
                // defaultValue={defaultValue}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
