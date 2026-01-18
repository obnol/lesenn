"use server";

import { authActionClient } from "./safe-action";
import { onboardingSchema } from "./schema";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { updateUser } from "@/lib/supabase/mutations";

export const onboardingAction = authActionClient
  .schema(onboardingSchema)
  .metadata({ name: "onboarding" })
  .action(async ({ parsedInput: { username }, ctx: { supabase, user } }) => {
    const { data } = await supabase.from("users").select().eq("username", username).single();

    if (data) {
      throw new Error("username already taken");
    }

    await Promise.all([supabase.auth.updateUser({ data: { username } }), updateUser(supabase, { username })]);

    revalidateTag(`user_${user.id}`, "max");

    redirect("/");
  });
