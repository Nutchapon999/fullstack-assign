import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.users.$post>;
type RequestType = InferRequestType<typeof client.api.users.$post>["json"];

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Failed to sign up");
      }

      return result;
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
}