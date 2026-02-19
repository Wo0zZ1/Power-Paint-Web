"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Workspace } from "@prisma/client";
import { Settings, Edit2Icon, Share2, Trash2 } from "lucide-react";

import { cn } from "@/utils";

import {
  Card,
  Label,
  Field,
  Input,
  Badge,
  Button,
  Dialog,
  Separator,
  CardTitle,
  FieldGroup,
  CardHeader,
  CardFooter,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DropdownMenu,
  DialogContent,
  DropdownMenuItem,
  DialogDescription,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui";
import { Access } from "@/shared/lib/auth";

import preview1 from "../../../../public/assets/preview1.jpeg"; // TODO Remove this hardcoded preview image

interface WorkspaceCardProps {
  workspace: Workspace;
  access: Access;
  className?: string;
}

export function WorkspaceCard({
  workspace,
  access,
  className,
}: WorkspaceCardProps) {
  const [isChangeWorkspaceNameModalOpen, setIsChangeWorkspaceNameModalOpen] =
    useState<boolean>(false);

  const [
    isChangeWorkspaceAccessModalOpen,
    setIsChangeWorkspaceAccessModalOpen,
  ] = useState<boolean>(false);

  return (
    <>
      <Card
        className={cn("select-text relative h-full overflow-hidden", className)}
      >
        <Badge
          className="select-auto absolute z-10 top-4 left-4 bg-accent-foreground/20"
          variant="outline"
        >
          Private
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon-sm"
              variant="secondary"
              className="absolute z-10 top-4 right-4"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Workspace Actions</DropdownMenuLabel>
            </DropdownMenuGroup>

            <Separator className="my-1" />

            <DropdownMenuGroup>
              {access.canDelete && (
                <DropdownMenuItem
                  onSelect={() => {
                    setIsChangeWorkspaceNameModalOpen(true);
                  }}
                >
                  <Edit2Icon />
                  Edit Name
                </DropdownMenuItem>
              )}

              {access.canDelete && (
                <DropdownMenuItem
                  onSelect={() => {
                    setIsChangeWorkspaceAccessModalOpen(true);
                  }}
                >
                  <Share2 />
                  Share
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>

            <Separator className="my-1" />

            {access.canDelete && (
              <DropdownMenuItem onSelect={console.log} variant="destructive">
                <Trash2 />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={`/workspaces/${workspace.id}`}>
          <Image
            src={preview1}
            quality={25}
            loading="eager"
            alt="Event cover"
            className="relative aspect-video"
          />
        </Link>
        <CardHeader>
          <CardTitle>{workspace.name}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button
            asChild
            variant="secondary"
            className="w-full text-xs md:text-base"
          >
            <Link href={`/workspaces/${workspace.id}`}>View</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Change Workspace Name Modal */}

      <Dialog
        open={isChangeWorkspaceNameModalOpen}
        onOpenChange={setIsChangeWorkspaceNameModalOpen}
      >
        <DialogContent>
          <form className="flex flex-col gap-4" action={console.log}>
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
                  id="workspace-name"
                  name="workspace-name"
                  placeholder="Enter workspace name"
                  defaultValue={workspace.name}
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

      {/* Change Workspace Access Modal */}

      <Dialog
        open={isChangeWorkspaceAccessModalOpen}
        onOpenChange={setIsChangeWorkspaceAccessModalOpen}
      >
        <DialogContent>
          <form className="flex flex-col gap-4" action={console.log}>
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
                  defaultValue={workspace.accessLevel || ""}
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
    </>
  );
}
