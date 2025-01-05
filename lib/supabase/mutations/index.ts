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
