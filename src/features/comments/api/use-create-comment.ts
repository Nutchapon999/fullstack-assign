import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/client";
import toast from "react-hot-toast";

type ResponseType = InferResponseType<typeof client.api.comments.$post>;
type RequestType = InferRequestType<typeof client.api.comments.$post>["json"];

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.comments.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: () => {
      toast.error("Failed to create comment");
    }
  });

  return mutation;
}