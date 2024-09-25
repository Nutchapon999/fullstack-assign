"use client";

import { useEffect, useState } from "react";

import { PostCreateModal } from "@/features/post/components/post-create-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <PostCreateModal />
    </>
  );
}