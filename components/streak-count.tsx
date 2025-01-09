import { getUserStreaks } from "@/lib/supabase/queries/cached-queries";

export async function StreakCount() {
  const response = await getUserStreaks();

  return response?.data?.days ? (
    <div className="flex gap-2">
      <p>streak:</p>
      <p>{response?.data?.days === 1 ? "1 day" : `${response?.data?.days} days`}</p>
    </div>
  ) : (
    <p className="text-muted-foreground font-semibold">no streak</p>
  );
}
