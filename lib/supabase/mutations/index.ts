import {
  AddBookSchemaFormValues,
  DeleteBookSchemaFormValues,
  EditBookSchemaFormValues,
  OnboardingSchemaFormValues,
} from "@/actions/schema";
import { getDaysDifference } from "@/lib/date-utils";
import { Client } from "../types";

export async function updateUser(supabase: Client, data: OnboardingSchemaFormValues) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  return supabase.from("users").update({ username: data.username }).eq("id", user.id).select().single();
}

interface AddBookParams extends AddBookSchemaFormValues {
  userId: string;
  pageCount: number;
  authors: string[];
}

export async function addBook(supabase: Client, data: AddBookParams) {
  await supabase.from("books").insert({
    title: data.title,
    authors: data.authors,
    page_count: data.pageCount,
    is_reading: data.isReading,
    user_id: data.userId,
    image_url: data.imageUrl,
  });
}

interface EditBookParams extends EditBookSchemaFormValues {
  userId: string;
}

export async function editBook(supabase: Client, data: EditBookParams) {
  // Get current book state to track date changes
  const { data: currentBook } = await supabase
    .from("books")
    .select("is_reading, is_finished, started_date, finished_date")
    .eq("id", data.bookId)
    .single();

  const now = new Date().toISOString();
  const updateData: Record<string, unknown> = {
    is_reading: data.isReading,
    is_finished: data.isFinished,
    progress: data.progress,
    progress_type: data.progressType,
    rating: data.rating,
  };

  // Set started_date when starting to read for the first time
  if (data.isReading && !currentBook?.started_date) {
    updateData.started_date = now;
  }

  // Set finished_date when finishing, clear it when un-finishing
  if (data.isFinished && !currentBook?.finished_date) {
    updateData.finished_date = now;
  } else if (!data.isFinished && currentBook?.finished_date) {
    updateData.finished_date = null;
  }

  await supabase.from("books").update(updateData).eq("id", data.bookId).eq("user_id", data.userId);
}

export async function deleteBook(supabase: Client, data: DeleteBookSchemaFormValues) {
  await supabase.from("books").delete().eq("id", data.bookId);
}

type UpdateStreakParams = {
  userId: string;
};

export async function updateStreak(supabase: Client, data: UpdateStreakParams) {
  const streak = await supabase.from("streak").select("*").eq("user_id", data.userId).single();

  const now = new Date();

  // If no streak exists, create one with 1 day
  if (!streak.data) {
    await supabase.from("streak").insert({ user_id: data.userId, days: 1, updated_at: now.toISOString() });
    return;
  }

  const lastUpdated = new Date(streak.data.updated_at);
  const daysDifference = getDaysDifference(now, lastUpdated);

  // If already updated today, do nothing
  if (daysDifference === 0) {
    return;
  }

  // If last updated was yesterday, increment the streak
  if (daysDifference === 1) {
    await supabase
      .from("streak")
      .update({
        days: (streak.data.days || 0) + 1,
        updated_at: now.toISOString(),
      })
      .eq("user_id", data.userId);
    return;
  }

  // If more than 1 day has passed, reset the streak to 1
  await supabase
    .from("streak")
    .update({
      days: 1,
      updated_at: now.toISOString(),
    })
    .eq("user_id", data.userId);
}
