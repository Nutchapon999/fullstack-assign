"use client";

import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

import { PostItem } from "./post-item";

import { useGetPosts } from "../api/use-get-posts";

export const PostContent = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const community = searchParams.get("community") || "";
  
  const debounceCommunity = useDebounce(community, 300); // Debounced community from a state
  const debounceSearch = useDebounce(search, 300);

  const { 
    data: posts,
    isLoading: postsLoading,
    refetch
  } = useGetPosts(
    debounceCommunity,
    debounceSearch
  );

  const [isLoading, setIsLoading] = useState(false);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if ((debounceSearch.trim() !== "" || debounceCommunity.trim() !== "") && !isFetchingRef.current) {
      refetch().finally(() => {
        setIsLoading(false);
        isFetchingRef.current = false;
      });
    } else if ((debounceSearch.trim() === "" || debounceCommunity.trim() === "") && !isFetchingRef.current) {
      refetch().finally(() => {
        setIsLoading(false);
        isFetchingRef.current = false;
      });
    }
  }, [refetch, debounceSearch, debounceCommunity]);

  if (isLoading) return null;

  return (
    <section className="w-full flex flex-col justify-start rounded-3xl overflow-hidden">
      {(isLoading || postsLoading) ? (
        <Loader className="size-10 animate-spin text-muted-foreground" />
      ) : (
        <>
          {posts?.map((post) => (
            <PostItem 
              key={post.post.id}
              id={post.post.id}
              title={post.post.title}
              description={post.post.description}
              community={post.post.community}
              createdAt={post.post.createdAt}
              createdBy={post.user?.name}
              searchTerm={debounceSearch}
            />
          ))}
        </>
      )}
    </section>
  );
}