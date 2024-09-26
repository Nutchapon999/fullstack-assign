"use client";

import { CommentSection } from "@/features/comments/components/comment-section";
import { useGetPost } from "@/features/post/api/use-get-post";
import { PostItem } from "@/features/post/components/post-item";
import { usePostId } from "@/hooks/use-post-id";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PostByIdPage = () => {
  const id = usePostId();

  const {
    data,
    isLoading,
  } = useGetPost(id);

  if (isLoading || data === undefined) return null;

  return (
    <section className="sm:ml-[280px] bg-white h-full flex justify-center">
      <div className="w-[800px] mt-10 flex flex-col gap-y-8 pb-8 mx-5">
        <Link href="/">
          <button className="size-11 bg-[#D8E9E4] flex justify-center items-center rounded-full">
            <ArrowLeft className="size-6" />
          </button>
        </Link> 
        <PostItem 
          id={id}
          title={data.title}
          description={data.description}
          community={data.community}
          createdBy={data.userName || ""}
          comment={data.commentCount}
          isOur={false}
          isList={false}
        />
        <CommentSection />
      </div>
    </section>
  );
}

export default PostByIdPage;