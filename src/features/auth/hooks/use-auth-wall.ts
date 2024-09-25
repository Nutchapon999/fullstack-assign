import { redirect } from "next/navigation";
import { useSession } from "next-auth/react"
import { Session } from "next-auth";

export const useAuthWall = (onOpen: () => void, status: "authenticated" | "loading" | "unauthenticated") => {
  if (status === "loading") return null

  if (!status) {
    redirect("/auth/sign-in");
  } else {
    onOpen();
  }
}