"use client";

import { Loader, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { getFallback } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground"/>
  }

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data?.user?.name!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-7 hover:opacity-75 transition cursor-pointer">
          <AvatarImage src="" />
          <AvatarFallback>
            { getFallback(name) }
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">
        <DropdownMenuItem className="h-7" onClick={() => signOut()}>
          <LogOut className="size-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}