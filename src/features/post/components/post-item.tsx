import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MessageCircle, Trash2 } from "lucide-react";

import { getFallback, cn } from "@/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { highlightText } from "@/features/post/utils";
import { usePostModal } from "../store/use-post-modal";
import { useDeletePost } from "../api/use-delete-post";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  community: "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others";
  createdBy: string | undefined;
  searchTerm?: string;
  comment: number;
  isOur: boolean;
  isList: boolean;
  goBack?: JSX.Element;
}

export const PostItem = ({
  id,
  title,
  description,
  community,
  createdBy,
  searchTerm,
  comment,
  isOur,
  isList,
  goBack
}: PostItemProps) => {
  const router = useRouter();
  const { onOpen } = usePostModal();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Please confirm if you wish to delete the post",
    "Are you sure you want to delete the post? Once deleted, it cannot be recovered."
  );

  const mutation = useDeletePost(id); 

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onOpen("edit", { title, description, community }, id);
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const ok = await confirm();

    if (ok) {
      mutation.mutate();
    }
  }

  return (
    <>
      <ConfirmationDialog />
      { goBack }
      <div                            
        onClick={() => router.push(`/posts/${id}`)}
        className={cn("bg-white h-[200px] hover:bg-white/80 transition-all duration-200 relative", isList && "p-5")}
      >
        {isOur &&(
          <div className="absolute top-[6px] right-4 flex items-center p-[2px] rounded-sm">
            <button
              onClick={handleEdit}
              className="h-6 w-6 flex items-center justify-center hover:bg-slate-200/80 rounded-sm"
            >
              <Edit className="size-4" />
            </button>
            <button
              onClick={handleDelete}
              className="h-6 w-6 flex items-center justify-center hover:bg-slate-200/80 rounded-sm"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
        <div className="flex flex-col justify-between h-full space-y-2">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="size-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-500 text-white">
                  { getFallback(createdBy || "") }
                </AvatarFallback>
              </Avatar>
              <div className="text-lg text-muted-foreground">
                { createdBy }
              </div>
            </div>
            <Badge variant="secondary" className="text-[#37352f] w-fit">
              { community }
            </Badge>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                { highlightText(title, searchTerm) }
              </h1>
              <p className="text-xs font-normal line-clamp-2 overflow-hidden">
                { description }
              </p>
            </div>
            <div className="flex items-center gap-x-1.5 text-muted-foreground text-xs">
              <MessageCircle className="size-3.5" />
              <p>{ comment } <span>Comments</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PostItem.skeleton = function PostItemSkeleton() {
  return (
    <Skeleton className="h-[200px] w-full rounded-2xl" />
  );
}