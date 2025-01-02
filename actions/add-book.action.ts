"use server";

import { addBook } from "@/lib/supabase/mutations";
import { authActionClient } from "./safe-action";
import { addBookSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const addBookAction = authActionClient
  .schema(addBookSchema)
  .metadata({ name: "add-book" })
  .action(async ({ parsedInput, ctx: { supabase, user } }) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(parsedInput.title)}&maxResults=1&key=${
        process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
      }`
    );
    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    if (!data.items) {
      throw new Error("No book found");
    }

    const book = data.items[0];

    await addBook(supabase, {
      title: book.volumeInfo.title,
      isReading: parsedInput.isReading,
      authors: book.volumeInfo.authors,
      userId: user.id,
      pageCount: book.volumeInfo.pageCount,
    });

    revalidateTag(`user-library-${user.id}`);
  });
