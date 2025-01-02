"use client";

import { addBookAction } from "@/actions/add-book.action";
import { addBookSchema, AddBookSchemaFormValues } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
  onSuccess: () => void;
};

export function AddBookForm({ className, onSuccess }: Props) {
  const addBook = useAction(addBookAction, {
    onError: () => {
      toast.error("something went wrong please try again");
    },
    onSuccess,
  });

  const form = useForm<AddBookSchemaFormValues>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      title: "",
      isReading: false,
    },
  });

  function onSubmit(data: AddBookSchemaFormValues) {
    addBook.execute(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="book title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isReading"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>currently reading</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={addBook.status === "executing"}>
          {addBook.status === "executing" ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>submit</span>}
        </Button>
      </form>
    </Form>
  );
}
