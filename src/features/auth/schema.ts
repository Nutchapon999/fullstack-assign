import { z } from "zod"; 

export const SignInSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: "must be at least 6 characters long."
    })
    .max(15, {
      message: "must not exceed 15 characters."
    }),
});