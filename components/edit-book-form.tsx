"use client";

import { editBookSchema, EditBookSchemaFormValues } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { editBookAction } from "@/actions/edit-book.action";
import { Book } from "@/lib/supabase/queries";

type Props = {
  className?: string;
  onSuccess: () => void;
  book: Book;
};

export function EditBookForm({ className, onSuccess, book }: Props) {
  const editBook = useAction(editBookAction, {
    onError: () => {
      toast.error("something went wrong please try again");
    },
    onSuccess: () => {
      onSuccess();
      toast.success("book updated successfully");
      form.reset();
    },
  });

  const form = useForm<EditBookSchemaFormValues>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      isReading: book.is_reading,
      isFinished: book.is_finished,
      progress: book.progress || 0,
      bookId: book.id,
    },
  });

  function onSubmit(data: EditBookSchemaFormValues) {
    editBook.execute({
      ...data,
      progress: data.isFinished ? book.page_count : data.progress,
      isReading: data.isFinished ? false : data.isReading,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)}>
        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>progress</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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

        <FormField
          control={form.control}
          name="isFinished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>mark as finished</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={editBook.status === "executing"}>
          {editBook.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : <span>save</span>}
        </Button>
      </form>
    </Form>
  );
}
