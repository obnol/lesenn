import "server-only";

import { unstable_cache } from "next/cache";
import { createClient } from "../server";
import { getUserLibraryQuery, getUserQuery } from "../queries";

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
    tags: [`user-${userId}`],
    revalidate: 3600,
  })();
}

export async function getUserLibrary() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return null;
  }

  return unstable_cache(async () => getUserLibraryQuery(supabase, userId), ["user-library", userId], {
    tags: [`user-library-${userId}`],
    revalidate: 3600,
  })();
}
