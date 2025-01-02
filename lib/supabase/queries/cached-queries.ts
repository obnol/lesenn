import "server-only";

import { unstable_cache } from "next/cache";
import { createClient } from "../server";
import { getUserQuery } from "../queries";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return null;
  }

  return unstable_cache(async () => getUserQuery(supabase, userId), ["user", userId], {
    tags: [`user_${userId}`],
    revalidate: 3600,
  })();
}
