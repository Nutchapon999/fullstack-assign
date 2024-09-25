"use client";

import { useToggle } from "react-use";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { ChevronDown, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAuthWall } from "@/features/auth/hooks/use-auth-wall";
import { usePostModal } from "@/features/post/store/use-post-modal";
import { communities } from "@/db/schema";

export const Toolbar = () => {
  const router = useRouter();
  const { status } = useSession();
  
  const { onOpen } = usePostModal();

  const [search, toggleSearch] = useToggle(false);

  const handleOpen = () => {
    if (status === "unauthenticated") {
      return router.push("/auth/sign-in");
    }

    onOpen();
  }

  return (
    <div className="flex items-center gap-x-2">
      <div className="relative w-full hidden sm:flex">
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      {!search && (
        <div className="flex-1 flex sm:hidden">
          <Button size="icon" variant="ghost" onClick={toggleSearch}>
            <Search className="size-4" />
          </Button>
        </div>
      )}
      {!search && (
        <div className="flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Community
                <ChevronDown className="size-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[320px] p-0" align="end">
              {communities.enumValues.map((community) => (
                <DropdownMenuItem key={community} className="rounded-none focus:bg-[#D8E9E4]"> 
                  { community }
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleOpen}>
            Create
          </Button>
        </div>
      )}
      {search && (
        <div className="relative w-full sm:hidden flex">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full"
          />
          <Button onClick={toggleSearch} size="icon" variant="ghost" className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="text-gray-400 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}