"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePostId } from "@/hooks/use-post-id";

import { PostItem } from "@/features/post/components/post-item";
import { CommentSection } from "@/features/comments/components/comment-section";

import { useGetPost } from "@/features/post/api/use-get-post";

const PostByIdPage = () => {
  const id = usePostId();

  const router = useRouter();
  
  const {
    data,
    isLoading,
  } = useGetPost(id);
  
  const [backLink, setBackLink] = useState<string | null>("/");

  useEffect(() => {
    if (window.history.length > 1) {
      setBackLink(null);
    } else if (document.referrer.includes("/blogs")) {
      setBackLink("/blogs");
    }
  }, []);

  const handleBack = () => {
    if (backLink) {
      router.push(backLink);
    } else {
      router.back(); 
    }
  };

  if (isLoading || data === undefined) return null;

  return (
    <section className="md:ml-[280px] bg-white h-full flex justify-center">
      <div className="w-[800px] mt-10 flex flex-col gap-y-8 pb-8 mx-5">
        <button
          onClick={handleBack}
          className="size-11 bg-[#D8E9E4] flex justify-center items-center rounded-full"
        >
          <ArrowLeft className="size-6" />
        </button>
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