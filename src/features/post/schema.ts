import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(100, {
      message: "Title must be 100 characters or less",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description is required"
    })
    .max(500, {
      message: "Description must be 500 characters or less"
    }),
  community: z
    .enum(["History", "Food", "Pets", "Health", "Fashion", "Exercise", "Others"], {
      required_error: "Please select a tag.",
    }).optional(),
})