import { OnboardingSchemaFormValues } from "@/actions/schema";
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
