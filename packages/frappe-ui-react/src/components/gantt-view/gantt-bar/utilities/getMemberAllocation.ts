import { addDays, eachDayOfInterval, isSameDay, startOfDay } from "date-fns";
import type { Allocation, Project } from "../../types";

/**
 * Derives a member's total allocation per calendar day by summing hours across
 * all project allocations. Returns an array of `Allocation` segments where
 * contiguous days with the same total hours are merged into a single entry.
 */
export function getMemberAllocation(projects: Project[]): Allocation[] {
  const allAllocs = projects.flatMap((p) => p.allocation ?? []);
  if (allAllocs.length === 0) return [];

  // Use local-midnight timestamps as keys to avoid UTC-offset date shifts
  // (toISOString() would produce the wrong date in UTC+ timezones)
  const dayHours = new Map<number, number>();
  for (const alloc of allAllocs) {
    for (const day of eachDayOfInterval({
      start: alloc.startDate,
      end: alloc.endDate,
    })) {
      const key = startOfDay(day).getTime();
      dayHours.set(key, (dayHours.get(key) ?? 0) + alloc.hours);
    }
  }

  // Sort days and merge contiguous runs with the same total hours
  const sortedDays = [...dayHours.entries()]
    .sort(([a], [b]) => a - b)
    .map(([ts, hours]) => ({ date: new Date(ts), hours }));

  const merged: Allocation[] = [];
  for (const { date, hours } of sortedDays) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.hours === hours &&
      isSameDay(addDays(last.endDate, 1), date)
    ) {
      last.endDate = date;
    } else {
      merged.push({ hours, startDate: date, endDate: date });
    }
  }
  return merged;
}
