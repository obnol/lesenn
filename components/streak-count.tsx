import { getUserStreaks } from "@/lib/supabase/queries/cached-queries";
import { isStreakActive } from "@/lib/date-utils";

export async function StreakCount() {
  const response = await getUserStreaks();

  // Check if streak exists and is still active
  const streakDays = response?.data?.days;
  const isActive = response?.data?.updated_at ? isStreakActive(response.data.updated_at) : false;

  if (!streakDays || !isActive) {
    return <p className="text-muted-foreground font-semibold">no streak</p>;
  }

  return (
    <div className="flex gap-2">
      <p>streak:</p>
      <p>{streakDays === 1 ? "1 day" : `${streakDays} days`}</p>
    </div>
  );
}
