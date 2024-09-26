import toast from "react-hot-toast";

import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePostId } from "@/hooks/use-post-id";
import { useToggle, useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { CommentItem } from "@/features/comments/components/comment-item";

import { useGetComments } from "@/features/comments/api/use-get-comments";
import { useCreateComment } from "@/features/comments/api/use-create-comment";
import { useCommentModal } from "@/features/comments/store/use-comment-modal";

export const CommentSection = () => {
  const router = useRouter();
  const postId = usePostId();
  const pathname = usePathname(); 

  const { status } = useSession()
  
  const { 
    data: comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetComments(postId);
  const mutation = useCreateComment(postId);
  const { comment, onComment, onOpen } = useCommentModal();
  
  const [addComment, toggleAddComment] = useToggle(false);

  const isMobile = useMedia("(max-width: 640px)");

  const handleAddComment = () => {
    if (status === "unauthenticated") {
      const encodedCallback = encodeURIComponent(pathname);
      return router.push(`/auth/sign-in?callbackUrl=${encodedCallback}`);
    }

    if (isMobile) {
      onOpen(); 
    } else {
      toggleAddComment(); 
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      message: comment,
      postId
    }, {
      onSuccess: () => {
        toast.success("Created comment");
        onComment("");
        toggleAddComment();
      }
    });
  }

  return (
    <>
      {!addComment ? (
        <Button variant="outline" onClick={handleAddComment} className="w-fit">
          Add Comments
        </Button>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <Textarea
            value={comment}
            placeholder="What's on your mind"
            onChange={(e) => onComment(e.target.value)}
            className="w-full h-[100px] resize-none"
            required
          />
          <div className="flex items-center justify-end space-x-2">
            <Button type="button" variant="outline" onClick={toggleAddComment}>
              Cancel
            </Button>
            <Button type="submit">
              Post
            </Button>
          </div> 
        </form>
      )}
      <div className="flex flex-col space-y-4">
        {isLoading ? (
          <Loader className="size-4 animate-spin text-muted-foreground" />
        ) : (
          comments?.pages.map((page) => (
            page.data.map((comment) => (
              <CommentItem 
                key={comment.id}
                message={comment.message}
                user={comment.user || ""}
                createdAt={comment.createdAt}
              />
            ))
          ))
        )}
        {hasNextPage && (
          <Button 
            variant="outline" 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load more...'}
          </Button>
        )}
      </div>
    </>
  );
}