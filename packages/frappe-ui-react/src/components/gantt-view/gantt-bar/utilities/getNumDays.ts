import { differenceInCalendarDays } from "date-fns";

/**
 * Returns the number of (non-weekend when `showWeekend` is false) days in [start, end] inclusive.
 */
export function getNumDays(
  start: Date,
  end: Date,
  showWeekend: boolean
): number {
  const calDays = differenceInCalendarDays(start, end);

  const startDay = (end.getDay() + 6) % 7;
  const numWeekendDays =
    Math.floor(calDays / 7) * 2 + Math.max(0, (calDays % 7) + startDay - 5);

  return calDays - (showWeekend ? 0 : numWeekendDays);
}
