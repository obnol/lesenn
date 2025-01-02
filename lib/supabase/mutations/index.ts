import { AddBookSchemaFormValues, OnboardingSchemaFormValues } from "@/actions/schema";
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
