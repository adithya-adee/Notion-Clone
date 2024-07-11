"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";

import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Mouse,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  isSearch?: boolean;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  extended?: boolean;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  onExpand,
  extended,
  documentIcon,
  isSearch,
}: ItemProps) => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const archive = useMutation(api.documents.Archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id });

    toast.promise(promise, {
      loading: "moving to trash",
      success: "Moved to Trash",
      error: "Failed moving to trash",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const ChevronIcon = extended ? ChevronDown : ChevronRight;

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Unititled", parentDocument: id }).then(
      (documentId) => {
        if (!extended) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new Note",
      success: "Note created successfully",
      error: "Error creating Note",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1  pr-3 w-full hover:bg-primary/5 flex items-center  text-muted-foreground font-medium"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div>{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium ">
          <span className="text-xs">CTRL + K</span>
        </kbd>
      )}

      {!!id && (
        <div className=" ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 "
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground " />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 z-[100000]"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2">Delete</Trash>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last Edited by {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover/sidebar:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};
