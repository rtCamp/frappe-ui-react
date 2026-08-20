import type { DurationInputSnapMode } from "./types";

export const SLIDER_STEP_MINUTES = 30;

/**
 * Converts decimal hours to `HH:MM`.
 *
 * @param float - Duration in hours.
 * @param hourPadding - Number of digits to pad hours to.
 * @param minutePadding - Number of digits to pad minutes to.
 * @returns Duration formatted as `HH:MM`.
 */
export function floatToTime(
  float: number,
  hourPadding: number = 2,
  minutePadding: number = 2
) {
  const totalMinutes = Math.round(float * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(hourPadding, "0");
  const formattedMinutes = String(minutes).padStart(minutePadding, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

/**
 * Converts a duration string to decimal hours.
 * Accepts decimal hours or `HH:MM`-style duration input.
 *
 * @param value - Duration string to parse.
 * @returns Duration in hours.
 */
export const timeToFloat = (value: string): number => {
  const trimmedValue = value.trim();

  if (/^(\d+(\.\d*)?|\.\d+)$/.test(trimmedValue)) {
    return Number(trimmedValue);
  }

  const hhmmMatch = /^([0-9]*):([0-9]*)$/.exec(trimmedValue);

  if (!hhmmMatch || (!hhmmMatch[1] && !hhmmMatch[2])) {
    return 0;
  }

  const hours = Number(hhmmMatch[1] || 0);
  const minutes = Number(hhmmMatch[2] || 0);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }

  return hours + minutes / 60;
};

/**
 * Clamps hours between `0` and the configured maximum.
 *
 * @param hours - Duration in hours.
 * @param maxDurationInHours - Maximum allowed duration in hours.
 * @returns Clamped duration in hours.
 */
export const clampHours = (
  hours: number,
  maxDurationInHours: number
): number => {
  return Math.min(Math.max(hours, 0), maxDurationInHours);
};

/**
 * Rounds slider minutes to the nearest slider step.
 *
 * @param minutes - Slider value in minutes.
 * @returns Snapped slider value in minutes.
 */
export const snapToSliderStep = (minutes: number): number => {
  return Math.round(minutes / SLIDER_STEP_MINUTES) * SLIDER_STEP_MINUTES;
};

/**
 * Extracts the numeric slider value from the slider payload.
 *
 * @param sliderValue - Scalar or array slider payload.
 * @returns Slider value in minutes.
 */
export const getSliderMinutes = (
  sliderValue: number | readonly number[]
): number => {
  if (typeof sliderValue === "number") {
    return sliderValue;
  }

  return sliderValue[0] ?? 0;
};

/**
 * Returns the slider preview value in minutes.
 *
 * @param minutes - Raw slider minutes.
 * @param snap - Slider snap mode.
 * @returns Preview minutes for the current slider position.
 */
export const getPreviewMinutes = (
  minutes: number,
  snap: DurationInputSnapMode
): number => {
  return snap === "smooth" ? snapToSliderStep(minutes) : minutes;
};

/**
 * Converts slider minutes into normalized hours.
 *
 * @param minutes - Raw slider minutes.
 * @param snap - Slider snap mode.
 * @param maxDurationInHours - Maximum allowed duration in hours.
 * @returns Normalized slider value in hours.
 */
export const getSliderHours = (
  minutes: number,
  snap: DurationInputSnapMode,
  maxDurationInHours: number
): number => {
  return clampHours(getPreviewMinutes(minutes, snap) / 60, maxDurationInHours);
};

/**
 * Normalizes committed hours based on overflow behavior.
 *
 * @param hours - Duration in hours.
 * @param maxDurationInHours - Maximum allowed duration in hours.
 * @param allowOverflow - Whether manual input can exceed the slider maximum.
 * @returns Normalized duration in hours.
 */
export const normalizeCommittedHours = (
  hours: number,
  maxDurationInHours: number,
  allowOverflow: boolean
): number => {
  if (allowOverflow) {
    return Math.max(hours, 0);
  }

  return clampHours(hours, maxDurationInHours);
};

/**
 * Filters text input down to characters valid for decimal hours or `HH:MM`.
 *
 * @param value - Raw input value.
 * @returns Sanitized input string.
 */
export const sanitizeHoursInput = (value: string): string => {
  const sanitizedValue = value.replace(/[^0-9:.]/g, "");

  // If the input contains a colon, treat it as `HH:MM` and remove any periods.
  if (sanitizedValue.includes(":")) {
    const [hours = "", ...minuteParts] = sanitizedValue
      .replace(/\./g, "")
      .split(":");

    return `${hours}:${minuteParts.join("")}`;
  }

  const [hours = "", ...decimalParts] = sanitizedValue.split(".");

  if (decimalParts.length === 0) {
    return hours;
  }

  return `${hours}.${decimalParts.join("")}`;
};

/**
 * Formats the balance text shown above the control.
 *
 * @param value - Balance in hours.
 * @returns Balance text in `Xh Ym` form (e.g. `10m`, `1h 30m`, `8h`).
 */
export const formatHoursBalance = (value: number): string => {
  const totalMinutes = Math.round(value * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (totalMinutes === 0) {
    return "0h";
  }

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};
