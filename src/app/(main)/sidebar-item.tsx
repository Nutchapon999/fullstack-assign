import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps) => {
  return (
    <Button 
      asChild
      variant="ghost"
      className="w-full h-8 flex items-center justify-start"
    >
      <Link href={href}>
        <Icon className="size-[18px] mr-1.5" />
        <span className="mx-2">{ label }</span>
      </Link>
    </Button> 
  );
}