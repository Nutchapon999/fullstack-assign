"use client";

import { useEffect, useState } from "react";

import { PostEditModal } from "@/features/post/components/post-edit-modal";
import { PostCreateModal } from "@/features/post/components/post-create-modal";
import { CommentCreateModal } from "@/features/comments/components/comment-create-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <PostEditModal />
      <PostCreateModal />
      <CommentCreateModal />
    </>
  );
}