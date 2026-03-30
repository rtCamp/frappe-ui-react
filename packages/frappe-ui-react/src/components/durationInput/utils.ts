export const SLIDER_STEP_MINUTES = 30;

/**
 * Converts a decimal number (representing hours as a float) to a HH:MM time format string.
 *
 * @param float - The decimal hours value (e.g., 1.5 for 1 hour 30 minutes)
 * @param hourPadding - Number of digits to pad hours to (default: 1)
 * @param minutePadding - Number of digits to pad minutes to (default: 2)
 * @returns Formatted time string in HH:MM format
 *
 * @example
 * floatToTime(1.5) // Returns "01:30"
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
 * Converts a duration string in various formats and returns the value in hours.
 * Accepts both decimal numbers and HH:MM format.
 *
 * @param value - Duration string in format "HH:MM"
 * @returns Number of hours, or 0 if the format is invalid
 *
 * @example
 * timeToFloat("1:30") // Returns 1.5
 */
export const timeToFloat = (value: string): number => {
  const trimmedValue = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmedValue)) {
    return Number(trimmedValue);
  }

  const hhmmMatch = /^([0-9]{1,2}):([0-9]{2})$/.exec(trimmedValue);
  if (!hhmmMatch) {
    return 0;
  }

  const hours = Number(hhmmMatch[1]);
  const mins = Number(hhmmMatch[2]);

  if (Number.isNaN(hours) || Number.isNaN(mins) || mins < 0 || mins > 59) {
    return 0;
  }

  return hours + mins / 60;
};

/**
 * Rounds a value in minutes to the nearest slider step.
 * Uses SLIDER_STEP_MINUTES as the rounding interval.
 *
 * @param minutes - Duration in minutes
 * @returns Snapped value in minutes, rounded to nearest step
 *
 * @example
 * snapToSliderStep(35) // Returns 30 (SLIDER_STEP_MINUTES = 30)
 */
export const snapToSliderStep = (minutes: number): number => {
  return Math.round(minutes / SLIDER_STEP_MINUTES) * SLIDER_STEP_MINUTES;
};

/**
 * Clamps a hours value between 0 and a maximum duration.
 *
 * @param hours - Duration in hours
 * @param maxDurationInHours - Maximum allowed duration in hours
 * @returns Clamped value between 0 and maxDurationInHours
 *
 * @example
 * clampHours(2, 5) // Returns 2
 */
export const clampHours = (
  hours: number,
  maxDurationInHours: number
): number => {
  return Math.min(Math.max(hours, 0), maxDurationInHours);
};
