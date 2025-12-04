import { useCallback, useEffect, useMemo, useState } from "react";
import { getDate, getDatesAfter, getDaysInMonth, getDateValue } from "./utils";
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

export function useDatePicker({
  value,
  onChange,
}: {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
} = {}) {
  const today = useMemo(() => getDate(), []);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DatePickerViewMode>("date");
  const [dateValue, setDateValue] = useState<string>(
    typeof value === "string" ? value : ""
  );
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );

  useEffect(() => {
    if (typeof value === "string") setDateValue(value);
  }, [value]);

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
      onChange?.(v);
      if (close) setOpen(false);
    },
    [onChange]
  );

  const selectToday = useCallback(() => {
    selectDate(getDate(), true);
  }, [selectDate]);

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
  };
}
