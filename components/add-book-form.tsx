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
      imageUrl: book.volumeInfo.imageLinks?.thumbnail,
    },
  });

  function onSubmit(data: AddBookSchemaFormValues) {
    addBook.execute(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)}>
        <div className="flex gap-4 items-start">
          {book.volumeInfo.imageLinks?.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="w-20 h-auto flex-shrink-0 object-cover rounded"
              style={{ maxHeight: "120px" }}
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold mb-1">{book.volumeInfo.title}</p>
            {book.volumeInfo.authors && (
              <p className="text-sm text-muted-foreground italic mb-1">{book.volumeInfo.authors.join(", ")}</p>
            )}
            {book.volumeInfo.pageCount && (
              <p className="text-xs text-muted-foreground">{book.volumeInfo.pageCount} pages</p>
            )}
          </div>
        </div>

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
          {addBook.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : <span>add to library</span>}
        </Button>
      </form>
    </Form>
  );
}
