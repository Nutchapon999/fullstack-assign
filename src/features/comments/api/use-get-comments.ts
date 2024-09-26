import { InferResponseType } from "hono";
import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.comments[":postId"]["$get"], 200>;

export const useGetComments = (postId: string) => {
  const infiniteQuery = useInfiniteQuery<ResponseType, Error>({
    enabled: !!postId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["comments", postId],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.comments[":postId"]["$get"]({
        param: {
          postId
        },
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      return await response.json();
    }
  });

  return infiniteQuery;
}