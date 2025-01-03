"use server";

import { addBook } from "@/lib/supabase/mutations";
import { authActionClient } from "./safe-action";
import { addBookSchema } from "./schema";
import { revalidateTag } from "next/cache";

type GoogleBook = {
  volumeInfo: {
    title: string;
    authors: string[];
    pageCount: number;
  };
};

export const addBookAction = authActionClient
  .schema(addBookSchema)
  .metadata({ name: "add-book" })
  .action(async ({ parsedInput, ctx: { supabase, user } }) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(parsedInput.title)}&maxResults=1&key=${
          process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
        }`
      );
      const data = await response.json();

      if (!data.items) {
        throw new Error("no book found");
      }

      const book = data.items[0] as GoogleBook;

      await addBook(supabase, {
        title: parsedInput.title,
        isReading: parsedInput.isReading,
        authors: book.volumeInfo.authors.map((author) => author.toLowerCase()),
        userId: user.id,
        pageCount: book.volumeInfo.pageCount,
      });

      revalidateTag(`user-library-${user.id}`);
    } catch {
      throw new Error("something went wrong please try again");
    }
  });
