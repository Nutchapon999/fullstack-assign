import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/client";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.posts.$get, 200>;

export const useGetPosts = (community: string, search: string) => {
  const infiniteQuery = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["posts", search, community],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.posts.$get({
        query: {
          community,
          search,
          page: (pageParam as number).toString(),
          limit: "5"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      return await response.json();
    }
  });

  return infiniteQuery;
}