import type { Client, Tables } from "../types";

/**
 * Get user by id
 */
export async function getUserQuery(supabase: Client, userId: string) {
  return supabase.from("users").select("*").eq("id", userId).single().throwOnError();
}

export type Book = Tables<"books">;

/**
 * Get user's library
 */
export async function getUserLibraryQuery(supabase: Client, userId: string) {
  return supabase.from("books").select("*").eq("user_id", userId).order("created_at", { ascending: false });
}
