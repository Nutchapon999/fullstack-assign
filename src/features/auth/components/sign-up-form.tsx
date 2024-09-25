"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { z } from "zod";
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

import { SignInSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../api/use-sign-up";

type SignUp = z.infer<typeof SignInSchema>;

export const SignUpForm = () => {
  const signUp = useSignUp();

  const form = useForm<SignUp>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (value: SignUp) => {
    signUp.mutate(value, {
      onSuccess: () => {
        form.reset();
        toast.success("Signed up");
      }
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
          <Link href="/auth/sign-in">
            Already have an account?
          </Link>
        </Button>
      </form>
    </Form>
  );
}