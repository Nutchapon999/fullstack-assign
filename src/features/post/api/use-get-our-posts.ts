import { InferResponseType } from "hono";
import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.posts["our"][":userId"]["$get"], 200>;

export const useGetOurPosts = (community: string, search: string, userId: string) => {
  const infiniteQuery = useInfiniteQuery<ResponseType, Error>({
    enabled: !!userId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["ourPosts", search, community],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.posts["our"][":userId"]["$get"]({
        query: {
          community,
          search,
          page: (pageParam as number).toString(),
          limit: "5"
        },
        param: {
          userId,
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