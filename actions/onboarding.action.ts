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
    await Promise.all([supabase.auth.updateUser({ data: { username } }), updateUser(supabase, { username })]);

    revalidateTag(`user_${user.id}`);

    redirect("/");
  });
