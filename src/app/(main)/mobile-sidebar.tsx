import * as SheetPrimitive from "@radix-ui/react-dialog"
import { ArrowRight, Edit, Home, MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";

import { SidebarItem } from "./sidebar-item";
import { UserButton } from "@/features/auth/components/user-button";

export const MobileSidebar = () => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden flex justify-center items-center">
          <MenuIcon className="size-4 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-y-4 text-white">
        <SheetPrimitive.Close>
          <ArrowRight className="size-6 ml-3" />
        </SheetPrimitive.Close>
        <div className="flex flex-col flex-1">
          <SidebarItem icon={Home} label="Home" href="/" />
          <SidebarItem icon={Edit} label="Our Blog" href="/blogs" />
        </div>
        <div className="flex justify-end">
          <UserButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}