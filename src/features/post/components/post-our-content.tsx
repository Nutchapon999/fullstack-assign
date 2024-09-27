"use client";

import { useUserId } from "@/hooks/use-user-id";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

import { Button } from "@/components/ui/button";

import { PostItem } from "@/features/post/components/post-item";

import { useGetOurPosts } from "@/features/post/api/use-get-our-posts";
import { TriangleAlert } from "lucide-react";

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

  if (!posts || posts.pages.length === 0 || posts.pages.every(page => page.data.length === 0)) {
    return (
      <div className="flex flex-col justify-center items-center h-full space-y-4">
        <TriangleAlert className="size-7 text-gray-500 stroke-[1.5]" />
        <div className="text-center text-gray-500">
          No posts found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start gap-y-4">
      <div className="rounded-3xl overflow-hidden">
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
            isList
          />
        ))
      )}
      </div>
      {hasNextPage && (
        <Button 
          variant="outline" 
          onClick={() => fetchNextPage()} 
          disabled={isFetchingNextPage}
          className="rounded-full"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load more...'}
        </Button>
      )}
    </div>
  );
}