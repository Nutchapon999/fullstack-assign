import { ArrowRight, Edit, Home } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { SidebarItem } from "./sidebar-item";

interface MobileSidebarProps {
  children: React.ReactNode;
}

export const MobileSidebar = ({ children }: MobileSidebarProps) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        { children }
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-y-4 text-white">
          <ArrowRight className="size-6 ml-3" />
          <div className="flex flex-col">
            <SidebarItem icon={Home} label="Home" href="/" />
            <SidebarItem icon={Edit} label="Our Blog" href="/" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}