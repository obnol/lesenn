"use client";

import { addBookAction } from "@/actions/add-book.action";
import { addBookSchema, AddBookSchemaFormValues } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { GoogleBook } from "@/lib/types";

type Props = {
  className?: string;
  book: GoogleBook;
  onSuccess: () => void;
};

export function AddBookForm({ book, className, onSuccess }: Props) {
  const addBook = useAction(addBookAction, {
    onError: () => {
      toast.error("something went wrong please try again");
    },
    onSuccess: () => {
      onSuccess();
      toast.success("book added successfully");
      form.reset();
    },
  });

  const form = useForm<AddBookSchemaFormValues>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      title: book.volumeInfo.title.toLowerCase(),
      isReading: false,
      authors: book?.volumeInfo?.authors?.map((author) => author.toLowerCase()),
      pageCount: book.volumeInfo.pageCount,
    },
  });

  function onSubmit(data: AddBookSchemaFormValues) {
    addBook.execute(data);
  }

  return (
    <Form {...form}>
      <p className="font-semibold">{book.volumeInfo.title}</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)}>
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
          {addBook.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : <span>save</span>}
        </Button>
      </form>
    </Form>
  );
}
