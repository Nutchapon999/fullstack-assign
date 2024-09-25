import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";

import { UserButton } from "@/features/auth/components/user-button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="h-10 bg-[#243831] flex items-center justify-between py-1.5 px-4 fixed w-full z-50">
      <Logo />
      <div className="sm:block hidden">
        {!session ? (
          <Button size="sm" asChild>
            <Link href="/auth/sign-in">
              Sign In
            </Link>
          </Button>
        ): (
          <UserButton />
        )}
      </div>
      <MobileSidebar>
        <Button variant="ghost" size="icon" className="sm:hidden flex justify-center items-center">
          <MenuIcon className="size-4 text-white" />
        </Button>
      </MobileSidebar>
    </header>
  );
}