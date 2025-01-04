"use server";

import { addBook } from "@/lib/supabase/mutations";
import { authActionClient } from "./safe-action";
import { addBookSchema } from "./schema";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const addBookAction = authActionClient
  .schema(addBookSchema)
  .metadata({ name: "add-book" })
  .action(async ({ parsedInput: { title, authors, isReading, pageCount }, ctx: { supabase, user } }) => {
    await addBook(supabase, {
      title,
      isReading,
      authors: authors || [],
      userId: user.id,
      pageCount: pageCount || 0,
    });

    revalidateTag(`user-library-${user.id}`);

    redirect(`/${user.username}`);
  });
