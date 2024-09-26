import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/client";

export type ResponseType = InferResponseType<typeof client.api.posts[":id"]["$get"], 200>["data"];

export const useGetPost = (id: string) => {
  const query = useQuery<ResponseType, Error>({
    enabled: !!id,
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await client.api.posts[":id"]["$get"]({
        param: {
          id
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
}
