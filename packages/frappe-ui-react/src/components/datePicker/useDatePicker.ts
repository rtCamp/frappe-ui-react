import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getDate,
  getDatesAfter,
  getDaysInMonth,
  getDateValue,
  getDateTimeValue,
  formatDateTime12h,
} from "./utils";
import { DatePickerViewMode } from "./types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats time in 12-hour format with AM/PM
 * @param hours - Hour value (0-23)
 * @param minutes - Minute value (0-59)
 * @returns Formatted time string
 */
function formatTime12h(hours: number, minutes: number): string {
  const period = hours >= 12 ? "pm" : "am";
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/**
 * Parses a 12-hour format time string into hours and minutes
 * @param timeStr - Time string in format "h:mm am/pm"
 * @returns Object containing hours and minutes
 */
function parseTimeValue(timeStr: string): { hours: number; minutes: number } {
  if (!timeStr) return { hours: 0, minutes: 0 };
  const [time, period] = timeStr.split(" ");
  const [h, m] = time.split(":").map(Number);
  let hours = h;
  const periodLower = period?.toLowerCase();
  if (periodLower === "pm" && h !== 12) hours += 12;
  if (periodLower === "am" && h === 12) hours = 0;
  return { hours, minutes: m };
}

/**
 * Generates an array of time options in 15-minute intervals for a full day
 * @returns Array of time strings in 12-hour format (e.g., ["12:00 am", "12:15 am", ...])
 */
function generateTimeOptions(): string[] {
  const options: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      options.push(formatTime12h(h, m));
    }
  }
  return options;
}

export function useDatePicker({
  value,
  onChange,
  withTime = false,
}: {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  withTime?: boolean;
} = {}) {
  const today = useMemo(() => getDate(), []);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DatePickerViewMode>("date");
  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>(withTime ? "12:00 am" : "");
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );

  useEffect(() => {
    if (typeof value === "string" && value) {
      if (withTime) {
        const parts = value.split(" ");
        const datePart = parts[0] || "";
        setDateValue(datePart);

        if (parts.length >= 2) {
          const timePart = parts.slice(1).join(" ");
          const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})/);
          if (timeMatch) {
            const hours = parseInt(timeMatch[1], 10);
            const minutes = parseInt(timeMatch[2], 10);
            setTimeValue(formatTime12h(hours, minutes));
          }
        }
      } else {
        setDateValue(value);
      }
    } else {
      setDateValue("");
      setTimeValue("");
    }
  }, [value, withTime]);

  const dates = useMemo(() => {
    if (!(currentYear && currentMonth)) return [];
    const monthIndex = currentMonth - 1;
    const year = currentYear;
    const firstDayOfMonth = getDate(year, monthIndex, 1);
    const lastDayOfMonth = getDate(year, monthIndex + 1, 0);
    const leftPaddingCount = firstDayOfMonth.getDay();
    const rightPaddingCount = 6 - lastDayOfMonth.getDay();

    const leftPadding = getDatesAfter(firstDayOfMonth, -leftPaddingCount);
    const rightPadding = getDatesAfter(lastDayOfMonth, rightPaddingCount);
    const daysInMonth = getDaysInMonth(monthIndex, year);
    const datesInMonth = getDatesAfter(firstDayOfMonth, daysInMonth - 1);

    const allDates = [
      ...leftPadding,
      firstDayOfMonth,
      ...datesInMonth,
      ...rightPadding,
    ];

    return allDates;
  }, [currentYear, currentMonth]);

  const datesAsWeeks = useMemo(() => {
    const weeks: Date[][] = [];
    const all = dates.slice();
    while (all.length) {
      weeks.push(all.splice(0, 7));
    }
    return weeks;
  }, [dates]);

  const formattedMonth = useMemo(() => {
    if (!(currentYear && currentMonth)) return "";
    const date = getDate(currentYear, currentMonth - 1, 1);
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${month} ${date.getFullYear()}`;
  }, [currentYear, currentMonth]);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 1) {
        setCurrentYear((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 12) {
        setCurrentYear((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  }, []);

  const selectDate = useCallback(
    (d: Date, close = false) => {
      const v = getDateValue(d);
      setDateValue(v);
      if (withTime) {
        const { hours, minutes } = parseTimeValue(timeValue);
        const newDate = getDate(v);
        newDate.setHours(hours, minutes, 0, 0);
        onChange?.(getDateTimeValue(newDate));
      } else {
        onChange?.(v);
      }
      if (close) setOpen(false);
    },
    [onChange, withTime, timeValue]
  );

  const selectToday = useCallback(() => {
    selectDate(getDate(), true);
  }, [selectDate]);

  const timeOptions = useMemo(() => generateTimeOptions(), []);

  const selectTime = useCallback(
    (time: string) => {
      setTimeValue(time);
      if (dateValue) {
        const { hours, minutes } = parseTimeValue(time);
        const d = getDate(dateValue);
        d.setHours(hours, minutes, 0, 0);
        onChange?.(getDateTimeValue(d));
      }
    },
    [dateValue, onChange]
  );

  const selectNow = useCallback(() => {
    const now = getDate();
    const v = getDateValue(now);
    setDateValue(v);
    if (withTime) {
      const time = formatTime12h(now.getHours(), now.getMinutes());
      setTimeValue(time);
      onChange?.(getDateTimeValue(now));
    } else {
      onChange?.(v);
    }
    setOpen(false);
  }, [onChange, withTime]);

  const selectTomorrow = useCallback(() => {
    const tomorrow = getDate();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const v = getDateValue(tomorrow);
    setDateValue(v);

    if (withTime) {
      const time =
        timeValue || formatTime12h(getDate().getHours(), getDate().getMinutes());
      if (!timeValue) setTimeValue(time);
      const { hours, minutes } = parseTimeValue(time);
      tomorrow.setHours(hours, minutes, 0, 0);
      onChange?.(getDateTimeValue(tomorrow));
    } else {
      tomorrow.setHours(0, 0, 0, 0);
      onChange?.(v);
    }
  }, [onChange, withTime, timeValue]);

  const clearValue = useCallback(() => {
    setDateValue("");
    setTimeValue("");
    onChange?.("");
    setOpen(false);
  }, [onChange]);

  const displayValue = useMemo(() => {
    if (!dateValue) return "";
    if (withTime) {
      const { hours, minutes } = parseTimeValue(timeValue);
      const d = getDate(dateValue);
      d.setHours(hours, minutes, 0, 0);
      return formatDateTime12h(d);
    }
    return dateValue;
  }, [dateValue, timeValue, withTime]);

  const cycleView = useCallback(() => {
    setView((prev) => {
      if (prev === "date") return "month";
      if (prev === "month") return "year";
      return "date";
    });
  }, []);

  const selectMonth = useCallback((monthIndex: number) => {
    setCurrentMonth(monthIndex + 1);
    setView("date");
  }, []);

  const selectYear = useCallback((year: number) => {
    setCurrentYear(year);
    setView("month");
  }, []);

  const yearRangeStart = useMemo(
    () => currentYear - (currentYear % 12),
    [currentYear]
  );

  const yearRange = useMemo(
    () => Array.from({ length: 12 }, (_, i) => yearRangeStart + i),
    [yearRangeStart]
  );

  const prev = useCallback(() => {
    if (view === "date") {
      setCurrentMonth((prev) => {
        if (prev === 1) {
          setCurrentYear((y) => y - 1);
          return 12;
        }
        return prev - 1;
      });
    } else if (view === "month") {
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentYear((y) => y - 12);
    }
  }, [view]);

  const next = useCallback(() => {
    if (view === "date") {
      setCurrentMonth((prev) => {
        if (prev === 12) {
          setCurrentYear((y) => y + 1);
          return 1;
        }
        return prev + 1;
      });
    } else if (view === "month") {
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentYear((y) => y + 12);
    }
  }, [view]);

  const resetView = useCallback(() => {
    setView("date");
    if (dateValue) {
      const selectedDate = getDate(dateValue);
      if (!isNaN(selectedDate.getTime())) {
        setCurrentYear(selectedDate.getFullYear());
        setCurrentMonth(selectedDate.getMonth() + 1);
      }
    }
  }, [dateValue]);

  return {
    open,
    setOpen,
    dateValue,
    setDateValue,
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    today,
    dates,
    datesAsWeeks,
    formattedMonth,
    prevMonth,
    nextMonth,
    selectDate,
    selectToday,
    view,
    setView,
    cycleView,
    selectMonth,
    selectYear,
    yearRangeStart,
    yearRange,
    prev,
    next,
    resetView,
    months: MONTHS,
    timeValue,
    setTimeValue,
    timeOptions,
    selectTime,
    selectNow,
    selectTomorrow,
    clearValue,
    displayValue,
  };
}
