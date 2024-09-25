import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getFallback } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  community: "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others";
  createdAt: string;
  createdBy: string | undefined;
}

export const PostItem = ({
  id,
  title,
  description,
  community,
  createdAt,
  createdBy
}: PostItemProps) => {
  return (
    <div role="button" className="bg-white h-[200px] p-5 border-b-[1.5px] hover:bg-white/80 transition-all duration-200">
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
            <h1 className="text-base font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{ title }</h1>
            <p className="text-xs font-normal line-clamp-2 overflow-hidden">
              { description }
            </p>
          </div>
          <div className="flex items-center gap-x-1.5 text-muted-foreground text-xs">
            <MessageCircle className="size-3.5" />
            <p>0 <span>Comments</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}