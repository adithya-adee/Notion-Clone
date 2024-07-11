"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import React, { ChangeEvent, ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import TextareaAutoSize from "react-textarea-autosize";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}
export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const removeIcon = useMutation(api.documents.removeIcon);
  const update = useMutation(api.documents.update);

  const coverImage = useCoverImage();
  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({ id: initialData._id, title: value || "Untitled" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      disableInput();
    }
  };

  const iconSelect = (icon: string) => {
    update({ id: initialData._id, icon });
  };

  const iconRemove = () => {
    removeIcon({ id: initialData._id });
  };
  return (
    <div className="pl-[45px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center group/icon gap-x-2">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl pt-6">{initialData.icon}</p>
          </IconPicker>
          <Button
            onClick={iconRemove}
            variant="outline"
            size="icon"
            className="opacity-0 rounded-full group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <div className="text-6xl pt-6">{initialData.icon}</div>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4 ">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={iconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
