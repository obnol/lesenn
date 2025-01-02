import type { Client } from "../types";

/**
 * Get user by id
 */
export async function getUserQuery(supabase: Client, userId: string) {
  return supabase.from("users").select("*").eq("id", userId).single().throwOnError();
}
