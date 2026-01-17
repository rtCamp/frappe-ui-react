import { dayjs } from "../../utils/dayjs";
import { TimePickerOption } from "./types";
import { ParsedTime } from "./types";

const isValid24HourFormat = (timeString: string): boolean => {
  return /^\d{2}:\d{2}(:\d{2})?$/.test(timeString);
};

/**
 * Parses flexible time input strings (12-hour or 24-hour format) and converts them to a structured time object.
 * Accepts formats like "14:30", "2pm", "2:30:45 pm", validates all components, and converts 12-hour times to 24-hour format.
 *
 * @param input - The time string to parse in various formats
 * @returns ParsedTime object with valid flag, 24-hour components (hh24, mm, ss), and total minutes from midnight
 */
export const parseFlexibleTimeHelper = (input: string): ParsedTime => {
  if (!input) {
    return { valid: false };
  }

  // Normalize input: lowercase, remove dots, ensure space before am/pm
  let sanitizedInput = input.trim().toLowerCase();
  sanitizedInput = sanitizedInput.replace(/\./g, "");
  sanitizedInput = sanitizedInput.replace(/(\d)(am|pm)$/, "$1 $2");

  // Match pattern: HH[:MM][:SS] [am/pm]
  const timePattern = /^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?\s*([ap]m)?$/;
  const match = sanitizedInput.match(timePattern);

  if (!match) {
    return { valid: false };
  }

  const [, hourString, minuteString, secondString, amPmMarker] = match;
  let hours = parseInt(hourString);

  if (isNaN(hours)) {
    return { valid: false };
  }

  // Validate hour range based on format (12h vs 24h)
  if (amPmMarker) {
    // 12-hour format with am/pm
    if (hours < 1 || hours > 12) {
      return { valid: false };
    }
  } else {
    // 24-hour format
    if (hours < 0 || hours > 23) {
      return { valid: false };
    }
  }

  // Cannot have seconds without minutes (e.g., "14::30" is invalid)
  if (secondString && !minuteString) {
    return { valid: false };
  }

  // Parse and validate minutes (default to 0 if not provided)
  const minutes =
    minuteString != null && minuteString !== "" ? parseInt(minuteString) : 0;

  if (isNaN(minutes) || minutes < 0 || minutes > 59) {
    return { valid: false };
  }

  // Parse and validate seconds
  let seconds: number | undefined;
  if (secondString) {
    seconds = parseInt(secondString);
    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
      return { valid: false };
    }
  }

  // Convert 12-hour to 24-hour format
  if (amPmMarker) {
    if (hours === 12 && amPmMarker === "am") {
      hours = 0; // 12am = 00:00
    } else if (hours < 12 && amPmMarker === "pm") {
      hours += 12; // 1pm-11pm = 13:00-23:00
    }
    // 12pm stays as 12
  }

  return {
    valid: true,
    hh24: hours.toString().padStart(2, "0"),
    mm: minutes.toString().padStart(2, "0"),
    ss: seconds != null ? seconds.toString().padStart(2, "0") : undefined,
    total: hours * 60 + minutes,
  };
};

/**
 * Normalizes time strings to standard 24-hour format (HH:MM or HH:MM:SS).
 * If already in correct format, returns as-is otherwise uses flexible parser.
 *
 * @param raw - Raw time string from external source
 * @returns Normalized time string in HH:MM or HH:MM:SS format, or empty string if invalid
 */
export const normalize24 = (raw: string): string => {
  if (!raw) {
    return "";
  }

  if (isValid24HourFormat(raw)) {
    return raw;
  }

  const parsedTime = parseFlexibleTimeHelper(raw);
  if (!parsedTime.valid) {
    return "";
  }

  const hasSeconds = parsedTime.ss !== undefined;
  return hasSeconds
    ? `${parsedTime.hh24}:${parsedTime.mm}:${parsedTime.ss}`
    : `${parsedTime.hh24}:${parsedTime.mm}`;
};

/**
 * Formats a 24-hour time string for display to the user based on their preference.
 * Converts from internal 24-hour storage format to user-friendly display format (12-hour with am/pm or 24-hour).
 *
 * @param val24 - Time string in 24-hour format (HH:MM or HH:MM:SS)
 * @param use12Hr - Whether to display in 12-hour format with am/pm
 * @returns Formatted time string for display
 */
export const formatDisplay = (val24: string, use12Hr: boolean): string => {
  if (!val24) {
    return "";
  }

  // Parse the time string with dayjs
  const timeDate = dayjs(`2000-01-01 ${val24}`);

  if (!timeDate.isValid()) {
    return "";
  }

  const hasSeconds = val24.split(":").length === 3;

  // Format based on preference
  if (use12Hr) {
    const format = hasSeconds ? "h:mm:ss a" : "h:mm a";
    return timeDate.format(format);
  }

  const format = hasSeconds ? "HH:mm:ss" : "HH:mm";
  return timeDate.format(format);
};

/**
 * Converts a time string in HH:MM format to total minutes elapsed since midnight.
 * Used for numerical time comparisons when validating against minTime/maxTime constraints.
 *
 * @param str - Time string that must match HH:MM or HH:MM:SS format exactly
 * @returns Total minutes from midnight (0-1439), or null if invalid format or out of range
 */
export const minutesFromHHMM = (str: string): number | null => {
  if (!str) {
    return null;
  }

  if (!isValid24HourFormat(str)) {
    return null;
  }

  const timeDate = dayjs(`2000-01-01 ${str}`);

  if (!timeDate.isValid()) {
    return null;
  }

  return timeDate.hour() * 60 + timeDate.minute();
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
  if (!list.length) {
    return -1;
  }

  // Convert all options to minutes for comparison using dayjs
  const optionMinutes = list.map((option) => {
    const timeDate = dayjs(`2000-01-01 ${option.value}`);
    return timeDate.hour() * 60 + timeDate.minute();
  });

  // Binary search for exact match or insertion point
  let leftIndex = 0;
  let rightIndex = optionMinutes.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = (leftIndex + rightIndex) >> 1;
    const midValue = optionMinutes[midIndex];

    if (midValue === targetMinutes) {
      return midIndex; // Exact match found
    }

    if (midValue < targetMinutes) {
      leftIndex = midIndex + 1;
    } else {
      rightIndex = midIndex - 1;
    }
  }

  // No exact match - find nearest neighbor
  const candidateIndices: number[] = [];

  if (leftIndex < optionMinutes.length) {
    candidateIndices.push(leftIndex);
  }
  if (leftIndex - 1 >= 0) {
    candidateIndices.push(leftIndex - 1);
  }

  if (!candidateIndices.length) {
    return -1;
  }

  // Return the index with minimum distance to target
  const nearestIndex = candidateIndices.sort((indexA, indexB) => {
    const distanceA = Math.abs(optionMinutes[indexA] - targetMinutes);
    const distanceB = Math.abs(optionMinutes[indexB] - targetMinutes);
    return distanceA - distanceB;
  })[0];

  return nearestIndex;
}
