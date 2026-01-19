/**
 * Date utility functions for streak calculations
 */

/**
 * Normalizes a date to UTC midnight (00:00:00) for consistent day comparisons
 */
export function normalizeDateToDay(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

/**
 * Calculates the difference in days between two dates (calendar days)
 */
export function getDaysDifference(date1: Date, date2: Date): number {
  const normalized1 = normalizeDateToDay(date1);
  const normalized2 = normalizeDateToDay(date2);
  const diffTime = normalized1.getTime() - normalized2.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Checks if a streak is still active (updated today)
 * A streak is active only if it was updated today (0 days ago)
 * If it was updated yesterday (1 day ago) or earlier, the streak is inactive
 */
export function isStreakActive(updatedAt: string): boolean {
  const lastUpdated = new Date(updatedAt);
  const now = new Date();
  const daysDifference = getDaysDifference(now, lastUpdated);
  
  // Streak is active only if updated today (0 days difference)
  // If 1+ days have passed, the streak is inactive/broken
  return daysDifference === 0;
}
