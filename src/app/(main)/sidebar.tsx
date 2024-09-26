
import { Edit, Home } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const Sidebar = () => {
  return (
    <aside className="w-[280px] h-full hidden sm:flex flex-col items-center pt-8 pb-4 px-2 fixed z-[50]">
      <SidebarItem icon={Home} label="Home" href="/" />
      <SidebarItem icon={Edit} label="Our Blog" href="/blogs" />
    </aside>
  );
}