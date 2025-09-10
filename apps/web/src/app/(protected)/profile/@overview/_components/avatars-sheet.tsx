"use client";

import * as React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAvatar } from "@/services/avatar.service";
import { cn } from "@/lib/utils";

interface AvatarsSheetProps {
  children: React.ReactNode;
  onSelect: (id: number) => void;
  avatars?: IAvatar[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatarUrl?: string;
}

export const AvatarsSheet: React.FC<AvatarsSheetProps> = ({
  onSelect,
  avatars = [],
  children,
  open,
  onOpenChange,
  currentAvatarUrl,
}) => {
  return (
    <Sheet defaultOpen={false} open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Avatars</SheetTitle>
          <SheetDescription>Choose your avatar</SheetDescription>

          <div className="grid grid-cols-2 gap-4 p-4">
            {avatars?.map((avatar) => (
              <div
                key={avatar.id}
                className={cn(
                  "hover:bg-accent/80 bg-accent/50 flex flex-col items-center justify-center gap-2 rounded-md border p-2 transition-colors delay-75 hover:cursor-pointer",
                  currentAvatarUrl === avatar.url &&
                    "border-primary bg-primary/10",
                )}
              >
                <Avatar
                  className="ring-muted bg-muted-foreground h-24 w-24 ring-1"
                  onClick={() => onSelect(avatar.id)}
                >
                  <AvatarImage
                    src={avatar.url || "/avatar1.png"}
                    alt={"avatar"}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <h2>{avatar.name}</h2>
              </div>
            ))}
          </div>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
