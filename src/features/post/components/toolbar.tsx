"use client";

import { useQueryState } from "nuqs";
import { useToggle } from "react-use";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { communities } from "@/db/schema";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { usePostModal } from "@/features/post/store/use-post-modal";

export const Toolbar = () => {
  const router = useRouter();
  const { status } = useSession();
  
  const { onOpen, type } = usePostModal();

  const [com, setCommunity] = useQueryState("community");
  const [search, setSearch] = useQueryState("search");
  const [searchBn, toggleSearchBn] = useToggle(false);

  const handleOpen = () => {
    if (status === "unauthenticated") {
      return router.push("/auth/sign-in");
    }

    onOpen("create");
  }

  const handleCommunityClick = (community: string) => {
    if (community === com) {
      setCommunity(null);
      router.replace("/"); 
    } else {
      setCommunity(community); 
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      setSearch(value);
    } else {
      setSearch(null);
      router.replace("/");
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <div className="relative w-full hidden sm:flex">
        <Input
          value={search || ""}
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      {!searchBn && (
        <div className="flex-1 flex sm:hidden">
          <Button size="icon" variant="ghost" onClick={toggleSearchBn}>
            <Search className="size-4" />
          </Button>
        </div>
      )}
      {!searchBn && (
        <div className="flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Community
                <ChevronDown className="size-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[320px] p-0" align="end">
              {communities.enumValues.map((community) => {
                const checked = community === com;

                return (
                  <DropdownMenuItem 
                    key={community}
                    onClick={() => handleCommunityClick(community)}
                    className={cn("rounded-none focus:bg-[#D8E9E4]", checked && "bg-[#D8E9E4]")}
                  > 
                    { community }
                    { checked && <Check className="size-4 ml-auto" />}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleOpen}>
            Create
          </Button>
        </div>
      )}
      {searchBn && (
        <div className="relative w-full sm:hidden flex">
          <Input
            value={search || ""}
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full"
          />
          <Button onClick={toggleSearchBn} size="icon" variant="ghost" className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="text-gray-400 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}