import { useCallback, useEffect, useMemo, useState } from "react";
import { getDate, getDatesAfter, getDaysInMonth, getDateValue } from "./utils";

export function useDatePicker({
  value,
  onChange,
}: {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
} = {}) {
  const today = useMemo(() => getDate(), []);
  const [open, setOpen] = useState(false);
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

    let allDates = [
      ...leftPadding,
      firstDayOfMonth,
      ...datesInMonth,
      ...rightPadding,
    ];

    if (allDates.length < 42) {
      const lastDate = allDates.at(-1);
      if (lastDate) {
        const finalPadding = getDatesAfter(lastDate, 42 - allDates.length);
        allDates = allDates.concat(finalPadding);
      }
    }
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
    const month = date.toLocaleString("en-US", { month: "long" });
    return `${month}, ${date.getFullYear()}`;
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
  };
}
