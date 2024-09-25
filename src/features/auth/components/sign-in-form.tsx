"use client";

import Link from "next/link";

import { z } from "zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SignInSchema } from "@/features/auth/schema";

type SignIn = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (value: SignIn) => {
    signIn("credentials", {
      username: value.username,
      callbackUrl: "/",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-white">Username</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  autoFocus
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full h-8" type="submit">
          Continue
        </Button>
        <Button
          size="sm"
          variant="link" 
          type="button"
          className="w-full text-white" 
          asChild
        >
          <Link href="/auth/sign-up">
            Don&apos;t have an account.
          </Link>
        </Button>
      </form>
    </Form>
  );
}