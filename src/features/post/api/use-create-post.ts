import toast from "react-hot-toast";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.posts["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.posts["$post"]>["json"];

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.posts.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to create post");
    }
  });

  return mutation;
}