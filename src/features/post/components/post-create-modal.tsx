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
import { usePostModal } from "../store/use-post-modal";
import { useCreatePost } from "../api/use-create-post";

type Post = z.infer<typeof PostSchema>;

export const PostCreateModal = () => {
  const { isOpen, onClose, type } = usePostModal();
  const isOpenModal = isOpen && type === "create";

  const mutation = useCreatePost();

  const onSubmit = (value: Post) => {
    mutation.mutate(value, {
      onSuccess: () => {
        toast.success("Created post");

        onClose();
      }
    });
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-[343px] h-[580px] sm:max-w-[685px] sm:h-[510px] flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="text-start">
            Create Post
          </DialogTitle>
        </DialogHeader>
        <PostForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            title: "",
            description: "",
            community: undefined,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}