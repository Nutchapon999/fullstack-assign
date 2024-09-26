"use client";

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

type Post = z.infer<typeof PostSchema>;

interface PostFormProps {
  id?: string;
  defaultValues?: Post;
  onSubmit: (value: Post) => void;
  disabled?: boolean;
}

export const PostForm = ({
  id,
  defaultValues,
  onSubmit,
  disabled
}: PostFormProps) => {
  const { onClose } = usePostModal();

  const form = useForm<Post>({
    resolver: zodResolver(PostSchema),
    defaultValues: defaultValues
  });

  const handleSubmit = (value: Post) => {
    onSubmit(value);
  }

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex-1 space-y-4 ">
          <FormField 
            control={form.control}
            name="community"
            render={({ field }) => (
              <FormItem>
                <Select 
                  disabled={disabled}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="border-[#49A569] sm:w-[50%]">
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
                    disabled={disabled}
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
              <FormItem className="h-full flex-1">
                <FormControl>
                  <Textarea 
                    {...field}
                    disabled={disabled}
                    className="h-[234px] text-sm py-2 resize-none"
                    placeholder="What's on your mind"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="flex-col gap-y-2">
          <Button variant="outline" type="button" onClick={onClose} disabled={disabled}>
            Cancel
          </Button>
          <Button type="submit" disabled={disabled}>
            { id ? "Confirm" : "Post" }
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}