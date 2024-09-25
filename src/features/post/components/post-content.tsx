"use client";

import { PostItem } from "./post-item";

import { useGetPosts } from "../api/use-get-posts";

export const PostContent = () => {
  const { data: posts, isLoading } = useGetPosts();

  if (isLoading) return null;

  return (
    <section className="w-full flex flex-col justify-start rounded-t-3xl overflow-hidden">
      {posts?.map((post) => (
        <PostItem 
          key={post.post.id}
          id={post.post.id}
          title={post.post.title}
          description={post.post.description}
          community={post.post.community}
          createdAt={post.post.createdAt}
          createdBy={post.user?.name}
        />
      ))}
    </section>
  );
}