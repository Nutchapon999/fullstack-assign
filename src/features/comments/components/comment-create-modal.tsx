import toast from "react-hot-toast";

import { usePostId } from "@/hooks/use-post-id";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useCommentModal } from "@/features/comments/store/use-comment-modal";
import { useCreateComment } from "@/features/comments/api/use-create-comment";

export const CommentCreateModal = () => {
  const postId = usePostId();
  const { isOpen, onClose, comment, onComment } = useCommentModal();
  const mutation = useCreateComment(postId);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      message: comment,
      postId
    }, {
      onSuccess: () => {
        toast.success("Created comment");
        onComment("");
        onClose();
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[343px] h-[346px] sm:max-w-[685px] sm:h-[346px] flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="text-start">
            Add Comments
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col flex-1 space-y-4">
          <Textarea
            value={comment}
            placeholder="What's on your mind"
            onChange={(e) => onComment(e.target.value)}
            className="resize-none h-full"
            required
            autoFocus
          />
          <DialogFooter className="flex-col gap-y-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Post
            </Button>
          </DialogFooter> 
        </form>
      </DialogContent>
    </Dialog>
  );
}