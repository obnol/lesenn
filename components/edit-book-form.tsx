"use client";

import { editBookSchema, EditBookSchemaFormValues } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { editBookAction } from "@/actions/edit-book.action";
import { Book } from "@/lib/supabase/queries";
import { DeleteBookButton } from "./delete-book-button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

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
      progressType: book.progress_type,
      notes: book.notes || "",
    },
  });

  const progressTypeWatch = form.watch("progressType");

  function onSubmit(data: EditBookSchemaFormValues) {
    if (book.is_finished) {
      editBook.execute({
        progress: 0,
        isReading: true,
        isFinished: false,
        bookId: book.id,
        notes: data.notes,
      });
    } else {
      editBook.execute({
        ...data,
        progress: data.isFinished ? book.page_count : data.progress,
        isReading: data.isFinished ? false : data.progress ? true : data.isReading,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {book.is_finished ? (
          <Button type="submit" className="w-full" disabled={editBook.status === "executing"}>
            {editBook.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : <span>re-read</span>}
          </Button>
        ) : (
          <div className={cn("flex flex-col gap-4", className)}>
            <FormField
              control={form.control}
              name="progressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>how are you tracking your progress?</FormLabel>
                  <FormControl>
                    <ToggleGroup type="single" value={field.value} onValueChange={field.onChange}>
                      <ToggleGroupItem value="page" aria-label="Toggle bold">
                        <p>page</p>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="percentage" aria-label="Toggle italic">
                        <p>percentage</p>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{progressTypeWatch === "page" ? "page" : "percentage"}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      max={progressTypeWatch === "page" ? book.page_count : 100}
                    />
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

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="add your thoughts, quotes, or notes about this book..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={editBook.status === "executing"}>
              {editBook.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : <span>save</span>}
            </Button>
          </div>
        )}
      </form>
      <div className="flex justify-center pt-4">
        <DeleteBookButton bookId={book.id} onSuccess={onSuccess} />
      </div>
    </Form>
  );
}
