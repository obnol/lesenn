"use server";

import { deleteBook } from "@/lib/supabase/mutations";
import { authActionClient } from "./safe-action";
import { deleteBookSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const deleteBookAction = authActionClient
  .schema(deleteBookSchema)
  .metadata({ name: "delete-book" })
  .action(async ({ parsedInput, ctx: { supabase, user } }) => {
    await deleteBook(supabase, parsedInput);

    revalidateTag(`user-library-${user.id}`);
  });
