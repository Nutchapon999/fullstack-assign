import { formatDistanceToNowStrict  } from "date-fns";

import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { getFallback } from "@/lib/utils";

interface CommentItemProps {
  message: string;
  user: string;
  createdAt: string;
}

export const CommentItem = ({
  message,
  user,
  createdAt
}: CommentItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <Avatar className="size-10">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-500 text-white">
            { getFallback(user) }
          </AvatarFallback>
        </Avatar>
        <div className="text-base font-semibold">
          { user }
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          { formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true }) }
        </div>
      </div>
      <div className="pl-[50px] overflow-hidden text-ellipsis whitespace-nowrap text-xs">
        { message }
      </div>
    </div>
  );
}