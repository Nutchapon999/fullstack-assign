import Link from "next/link";

import { auth } from "@/auth";

import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";

import { MobileSidebar } from "./mobile-sidebar";

import { UserButton } from "@/features/auth/components/user-button";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="h-10 bg-[#243831] flex items-center justify-between py-1.5 px-4 fixed w-full z-50">
      <Logo />
      <div className="md:block hidden">
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
      <MobileSidebar />
    </header>
  );
}