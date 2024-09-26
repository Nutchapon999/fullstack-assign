"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const BlogPage = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    return router.push(`/blogs/${session.data?.user?.id}`);
  }

  if (session.status === "unauthenticated") {
    return router.push("/auth/sign-in?callbackUrl=/blogs");
  }

  return (
    <>
    </>
  );
}

export default BlogPage;