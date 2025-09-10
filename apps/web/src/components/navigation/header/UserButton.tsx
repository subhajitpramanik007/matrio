"use client";

import Link from "next/link";
import { useSignout } from "@/hooks/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types";

// first two characters of name or username
function avatarFallbackText(name?: string, username?: string) {
  if (name) return name.slice(0, 2).toUpperCase();
  if (username) return username.slice(0, 2).toUpperCase();
}

interface UserButtonProps {
  user: IUser | null;
}

export function UserButton({ user }: UserButtonProps) {
  const { signout } = useSignout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {/* random color */}
        <Avatar>
          <AvatarImage src={user?.avatar?.url} alt={`@${user?.avatar?.name}`} />
          <AvatarFallback className="bg-primary/30 ring-primary ring-2 ring-offset-2">
            {avatarFallbackText(user?.name, user?.username)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signout()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
