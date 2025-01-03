"use server";

import { createClient } from "@/lib/supabase/server";
import { actionClient } from "./safe-action";
import { verifyOtpSchema } from "./schema";
import { redirect } from "next/navigation";

export const verifyOtpAction = actionClient.schema(verifyOtpSchema).action(async ({ parsedInput: { token, email } }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

  if (error) {
    throw error;
  }

  if (data) {
    redirect("/");
  }
});
