import {
  AddBookSchemaFormValues,
  DeleteBookSchemaFormValues,
  EditBookSchemaFormValues,
  OnboardingSchemaFormValues,
} from "@/actions/schema";
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
  });
}

interface EditBookParams extends EditBookSchemaFormValues {
  userId: string;
}

export async function editBook(supabase: Client, data: EditBookParams) {
  await supabase
    .from("books")
    .update({ is_reading: data.isReading, is_finished: data.isFinished, progress: data.progress, progress_type: data.progressType })
    .eq("id", data.bookId)
    .eq("user_id", data.userId);
}

export async function deleteBook(supabase: Client, data: DeleteBookSchemaFormValues) {
  await supabase.from("books").delete().eq("id", data.bookId);
}

type UpdateStreakParams = {
  userId: string;
};

export async function updateStreak(supabase: Client, data: UpdateStreakParams) {
  const streak = await supabase.from("streak").select("*").eq("user_id", data.userId).single();

  if (!streak.data) {
    await supabase.from("streak").insert({ user_id: data.userId, days: 1, updated_at: new Date().toISOString() });
    return;
  }

  // Check if the streak was last updated today
  const lastUpdated = new Date(streak.data.updated_at);
  const today = new Date();
  const isUpdatedToday =
    lastUpdated.getDate() === today.getDate() &&
    lastUpdated.getMonth() === today.getMonth() &&
    lastUpdated.getFullYear() === today.getFullYear();

  // If not updated today, increment the streak and update the timestamp
  if (!isUpdatedToday) {
    await supabase
      .from("streak")
      .update({
        days: streak.data.days! + 1,
        updated_at: today.toISOString(),
      })
      .eq("user_id", data.userId);
  }
}
