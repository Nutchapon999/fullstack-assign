import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/client";

export const useGetPosts = (community: string, search: string) => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await client.api.posts.$get({
        query: {
          community,
          search,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}