import toast from "react-hot-toast";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.posts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.posts[":id"]["$patch"]>["json"];

export const useEditPost = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.posts[":id"]["$patch"]({
        param: {
          id
        },
        json
      });

      if (!response.ok) {
        throw new Error("Failed to edit post");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ourPosts"] });
    },
    onError: () => {
      toast.error("Failed to edit post");
    }
  });

  return mutation;
}