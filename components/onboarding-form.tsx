"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { onboardingSchema, OnboardingSchemaFormValues } from "@/actions/schema";
import { onboardingAction } from "@/actions/onboarding.action";

export function OnboardingForm() {
  const onboardingUser = useAction(onboardingAction, {
    onError: () => {
      toast.error("something went wrong please try again");
    },
  });

  const form = useForm<OnboardingSchemaFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
    },
  });

  const isSubmitting = onboardingUser.status !== "idle" && onboardingUser.status !== "hasErrored";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onboardingUser.execute)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="h-4 w-4 animate-spin" /> : <span>continue</span>}
        </Button>
      </form>
    </Form>
  );
}
