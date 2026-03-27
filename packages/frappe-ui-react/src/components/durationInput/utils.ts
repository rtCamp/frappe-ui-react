export const SLIDER_STEP_MINUTES = 30;

export function floatToTime(
  float: number,
  hourPadding: number = 1,
  minutePadding: number = 2
) {
  const totalMinutes = Math.round(float * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(hourPadding, "0");
  const formattedMinutes = String(minutes).padStart(minutePadding, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export const parseDurationToHours = (value: string): number | null => {
  const trimmedValue = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmedValue)) {
    return Number(trimmedValue);
  }

  const hhmmMatch = /^([0-9]{1,2}):([0-9]{2})$/.exec(trimmedValue);
  if (!hhmmMatch) {
    return null;
  }

  const hours = Number(hhmmMatch[1]);
  const mins = Number(hhmmMatch[2]);

  if (Number.isNaN(hours) || Number.isNaN(mins) || mins < 0 || mins > 59) {
    return null;
  }

  return hours + mins / 60;
};

export const snapToSliderStep = (minutes: number): number => {
  return Math.round(minutes / SLIDER_STEP_MINUTES) * SLIDER_STEP_MINUTES;
};

export const clampHours = (
  hours: number,
  maxDurationInHours: number
): number => {
  return Math.min(Math.max(hours, 0), maxDurationInHours);
};
