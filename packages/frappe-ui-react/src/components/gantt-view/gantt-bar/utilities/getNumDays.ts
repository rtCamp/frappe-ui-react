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
  const r = calDays % 7;
  const satOffset = (5 - startDay + 7) % 7;
  const sunOffset = (6 - startDay + 7) % 7;
  const numWeekendDays =
    Math.floor(calDays / 7) * 2 +
    (satOffset < r ? 1 : 0) +
    (sunOffset < r ? 1 : 0);

  return calDays - (showWeekend ? 0 : numWeekendDays);
}
