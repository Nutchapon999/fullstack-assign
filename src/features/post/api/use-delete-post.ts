import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.posts[":id"]["$delete"]>;

export const useDeletePost = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.posts[":id"]["$delete"]({
        param: {
          id
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Deleted post");
      queryClient.invalidateQueries({ queryKey: ["ourPosts"] });
    },
    onError: () => {
      toast.error("Failed to delete post");
    }
  });

  return mutation;
}