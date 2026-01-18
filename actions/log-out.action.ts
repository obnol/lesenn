"use server";

import { getUser } from "@/lib/supabase/queries/cached-queries";
import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function logOutAction() {
  const supabase = await createClient();

  const user = await getUser();

  await supabase.auth.signOut();

  if (user?.data?.id) {
    revalidateTag(`user_${user.data.id}`, "max");
  }

  return redirect("/");
}
