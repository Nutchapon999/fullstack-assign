import toast from "react-hot-toast";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { PostSchema } from "@/features/post/schema";

import { PostForm } from "@/features/post/components/post-form";

import { useEditPost } from "@/features/post/api/use-edit-post";
import { usePostModal } from "@/features/post/store/use-post-modal";

type Post = z.infer<typeof PostSchema>;

export const PostEditModal = () => {
  const { isOpen, onClose, data, type, id } = usePostModal();
  const isOpenModal = isOpen && type === "edit";

  const mutation = useEditPost(id);

  const onSubmit = (value: Post) => {
    mutation.mutate(value, {
      onSuccess: () => {
        toast.success("Created post");

        onClose();
      }
    });
  }

  const defaultValues = {
    title: data.title || "",
    description: data.description || "",
    community: data.community
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-[343px] h-[580px] sm:max-w-[685px] sm:h-[510px] flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="text-start">
            Edit Post
          </DialogTitle>
        </DialogHeader>
        <PostForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}