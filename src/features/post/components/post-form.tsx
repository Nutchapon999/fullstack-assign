"use client";

import toast from "react-hot-toast";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { communities } from "@/db/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

import { PostSchema } from "@/features/post/schema";

import { usePostModal } from "@/features/post/store/use-post-modal";
import { useCreatePost } from "@/features/post/api/use-create-post";

type Post = z.infer<typeof PostSchema>

export const PostForm = () => {
  const { onClose } = usePostModal();

  const mutation = useCreatePost();

  const form = useForm<Post>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      description: "",
      community: undefined,
    }
  });

  const onSubmit = (value: Post) => {
    mutation.mutate(value, {
      onSuccess: () => {
        form.reset();
        toast.success("Created post");

        onClose();
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          control={form.control}
          name="community"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#49A569] w-[50%]">
                    <SelectValue placeholder="Choose a community" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {communities.enumValues.map((community, index) => (
                    <SelectItem key={index} value={community}>
                      { community }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  type="text"
                  className="h-10"
                  placeholder="Title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  {...field}
                  className="h-10 text-sm py-2 resize-none"
                  placeholder="What's on your mind"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Post
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}