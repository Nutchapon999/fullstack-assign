"use client";

import Link from "next/link";

import { z } from "zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

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
import { useState } from "react";
import { FormError } from "./form-error";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";

type SignIn = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error");

  const [error, setError] = useState<string | undefined>("");

  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (value: SignIn) => {
    setError("")

    signIn("credentials", {
      username: value.username,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    }).catch(() => setError("Something went wrong"))
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
        <FormError message={error || urlError} />
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