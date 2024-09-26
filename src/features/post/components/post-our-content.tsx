"use client";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

import { PostItem } from "@/features/post/components/post-item";

import { useGetOurPosts } from "../api/use-get-our-posts";
import { useUserId } from "@/hooks/use-user-id";

export const PostOurContent = () => {
  const userId = useUserId();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const community = searchParams.get("community") || "";
  
  const debounceSearch = useDebounce(search, 300);
  const debounceCommunity = useDebounce(community, 300);

  const { 
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetOurPosts(
    debounceCommunity,
    debounceSearch,
    userId
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2">
        <PostItem.skeleton />
        <PostItem.skeleton />
        <PostItem.skeleton />
        <PostItem.skeleton />
        <PostItem.skeleton />
      </div>
    );
  };

  return (
    <section className="w-full flex flex-col justify-start rounded-3xl overflow-hidden">
      {posts?.pages.map((page) =>
        page.data.map((data) => (
          <PostItem
            key={data.id}
            id={data.id}
            title={data.title}
            description={data.description}
            community={data.community}
            createdBy={data.userName || ""}
            searchTerm={debounceSearch}
            comment={data.commentCount}
            isOur
          />
        ))
      )}
      {isFetchingNextPage && <Loader className="size-10 animate-spin text-muted-foreground" />}
    </section>
  );
}