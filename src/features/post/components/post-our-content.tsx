"use client";

import { useSession } from "next-auth/react";
import { useUserId } from "@/hooks/use-user-id";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

import { Button } from "@/components/ui/button";

import { PostItem } from "@/features/post/components/post-item";

import { useGetOurPosts } from "@/features/post/api/use-get-our-posts";

export const PostOurContent = () => {
  const userId = useUserId();
  const session = useSession();
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

  return (
    <section className="w-full flex flex-col justify-start gap-y-4">
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
            blogLink={`/blogs/${session.data?.user?.id}`}
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
    </section>
  );
}