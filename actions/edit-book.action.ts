"use server";

import { editBook, updateStreak } from "@/lib/supabase/mutations";
import { authActionClient } from "./safe-action";
import { editBookSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const editBookAction = authActionClient
  .schema(editBookSchema)
  .metadata({ name: "edit-book" })
  .action(async ({ parsedInput, ctx: { supabase, user } }) => {
    await editBook(supabase, { ...parsedInput, userId: user.id });

    await updateStreak(supabase, { userId: user.id });

    revalidateTag(`user-library-${user.id}`, "max");
    revalidateTag(`user-streaks-${user.id}`, "max");
  });
