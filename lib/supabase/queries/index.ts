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
  return supabase
    .from("books")
    .select("*")
    .eq("user_id", userId)
    .order("is_reading", { ascending: false })
    .order("created_at", { ascending: false })
    .order("is_finished", { ascending: false });
}

/**
 * Get user's streaks
 */
export async function getUserStreaksQuery(supabase: Client, userId: string) {
  return supabase.from("streak").select("*").eq("user_id", userId).single();
}
