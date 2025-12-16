import { TimePickerOption } from "./types";
import { ParsedTime } from "./types";

/**
 * Parses flexible time input strings (12-hour or 24-hour format) and converts them to a structured time object.
 * Accepts formats like "14:30", "2pm", "2:30:45 pm", validates all components, and converts 12-hour times to 24-hour format.
 *
 * @param input - The time string to parse in various formats
 * @returns ParsedTime object with valid flag, 24-hour components (hh24, mm, ss), and total minutes from midnight
 */
export const parseFlexibleTimeHelper = (input: string): ParsedTime => {
  if (!input) return { valid: false };
  let s = input.trim().toLowerCase();
  s = s.replace(/\./g, "");
  s = s.replace(/(\d)(am|pm)$/, "$1 $2");
  const re = /^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?\s*([ap]m)?$/;
  const m = s.match(re);
  if (!m) return { valid: false };
  const [, hhStr, mmStr, ssStr, ap] = m;
  let hh = parseInt(hhStr);
  if (isNaN(hh) || hh < 0 || hh > 23) return { valid: false };
  if (ssStr && !mmStr) return { valid: false };
  const mm = mmStr != null && mmStr !== "" ? parseInt(mmStr) : 0;
  if (isNaN(mm) || mm < 0 || mm > 59) return { valid: false };
  let ss: number | undefined;
  if (ssStr) {
    ss = parseInt(ssStr);
    if (isNaN(ss) || ss < 0 || ss > 59) return { valid: false };
  }
  if (ap) {
    if (hh < 1 || hh > 12) return { valid: false };
    if (hh === 12 && ap === "am") hh = 0;
    else if (hh < 12 && ap === "pm") hh += 12;
  }
  return {
    valid: true,
    hh24: hh.toString().padStart(2, "0"),
    mm: mm.toString().padStart(2, "0"),
    ss: ss != null ? ss.toString().padStart(2, "0") : undefined,
    total: hh * 60 + mm,
  };
};

/**
 * Normalizes time strings to standard 24-hour format (HH:MM or HH:MM:SS) during initialization.
 * If already in correct format, returns as-is otherwise uses flexible parser.
 *
 * @param raw - Raw time string from external source
 * @returns Normalized time string in HH:MM or HH:MM:SS format, or empty string if invalid
 */
export const normalize24Initial = (raw: string): string => {
  if (!raw) return "";
  if (/^\d{2}:\d{2}$/.test(raw)) return raw;
  if (/^\d{2}:\d{2}:\d{2}$/.test(raw)) return raw;
  const parsed = parseFlexibleTimeHelper(raw);
  if (!parsed.valid) return "";
  return parsed.ss
    ? `${parsed.hh24}:${parsed.mm}:${parsed.ss}`
    : `${parsed.hh24}:${parsed.mm}`;
};

/**
 * Formats a 24-hour time string for display during component initialization.
 * Converts from internal 24-hour storage format to user-friendly display format (12-hour with am/pm or 24-hour).
 *
 * @param val24 - Time string in 24-hour format (HH:MM or HH:MM:SS)
 * @param use12Hr - Whether to display in 12-hour format with am/pm
 * @returns Formatted time string for display
 */
export const formatDisplayInitial = (
  val24: string,
  use12Hr: boolean
): string => {
  if (!val24) return "";
  const segs = val24.split(":");
  const h = parseInt(segs[0]);
  const m = parseInt(segs[1]);
  const s = segs[2];
  const base24 = `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}${s ? `:${s}` : ""}`;
  if (!use12Hr) return base24;
  const am = h < 12;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")}${s ? `:${s}` : ""} ${
    am ? "am" : "pm"
  }`;
};

/**
 * Converts a time string in HH:MM format to total minutes elapsed since midnight.
 * Used for numerical time comparisons when validating against minTime/maxTime constraints.
 *
 * @param str - Time string that must match HH:MM or HH:MM:SS format exactly
 * @returns Total minutes from midnight (0-1439), or null if invalid format or out of range
 */
export const minutesFromHHMM = (str: string): number | null => {
  if (!str) return null;
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(str)) return null;
  const [h, m] = str.split(":").map((n) => parseInt(n));
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
};

/**
 * Normalizes time strings to standard 24-hour format (HH:MM or HH:MM:SS).
 * Primary normalization function used throughout component lifecycle to ensure consistent internal time storage.
 *
 * @param raw - Time string in any supported format
 * @returns Normalized time string in HH:MM or HH:MM:SS format, or empty string if invalid
 */
export const normalize24 = (raw: string): string => {
  if (!raw) return "";
  if (/^\d{2}:\d{2}$/.test(raw)) return raw;
  if (/^\d{2}:\d{2}:\d{2}$/.test(raw)) return raw;
  const parsed = parseFlexibleTimeHelper(raw);
  if (!parsed.valid) return "";
  return parsed.ss
    ? `${parsed.hh24}:${parsed.mm}:${parsed.ss}`
    : `${parsed.hh24}:${parsed.mm}`;
};

/**
 * Formats a 24-hour time string for display to the user based on their preference.
 * Primary display formatting function used when updating the displayed value as user types or navigates.
 *
 * @param val24 - Time string in 24-hour format (HH:MM or HH:MM:SS)
 * @param use12Hr - Whether to use 12-hour format with am/pm
 * @returns User-facing formatted time string
 */
export const formatDisplay = (val24: string, use12Hr: boolean): string => {
  if (!val24) return "";
  const segs = val24.split(":");
  const h = parseInt(segs[0]);
  const m = parseInt(segs[1]);
  const s = segs[2];
  const base24 = `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}${s ? `:${s}` : ""}`;
  if (!use12Hr) return base24;
  const am = h < 12;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")}${s ? `:${s}` : ""} ${
    am ? "am" : "pm"
  }`;
};

/**
 * Finds the index of the time option closest to a target time value using binary search.
 * Used for snapping user input to nearest valid option when allowCustom=false and highlighting nearest option while typing.
 *
 * @param targetMinutes - Target time in minutes from midnight (0-1439)
 * @param list - Array of time options to search through
 * @returns Index of nearest option, or -1 if list is empty
 */
export function findNearestIndex(
  targetMinutes: number,
  list: TimePickerOption[]
): number {
  if (!list.length) return -1;
  const minutesArr = list.map((o) => {
    const [hh, mm] = o.value.split(":").map(Number);
    return hh * 60 + mm;
  });
  let lo = 0,
    hi = minutesArr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = minutesArr[mid];
    if (val === targetMinutes) return mid;
    if (val < targetMinutes) lo = mid + 1;
    else hi = mid - 1;
  }
  const candidates: number[] = [];
  if (lo < minutesArr.length) candidates.push(lo);
  if (lo - 1 >= 0) candidates.push(lo - 1);
  if (!candidates.length) return -1;
  return candidates.sort(
    (a, b) =>
      Math.abs(minutesArr[a] - targetMinutes) -
      Math.abs(minutesArr[b] - targetMinutes)
  )[0];
}
