/**
 * External dependencies.
 */
import { useCallback, useState } from "react";

/**
 * Internal dependencies.
 */
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue } from "./utils";

export function useDateRangePicker({
  value,
  onChange,
  disallowAfter,
}: {
  value?: string[];
  onChange?: (v: string[]) => void;
  disallowAfter?: string;
}) {
  // Selection state, used only when the range is not driven by `value`.
  const [internalFrom, setInternalFrom] = useState<string>(value?.[0] || "");
  const [internalTo, setInternalTo] = useState<string>(value?.[1] || "");

  const isControlled = Array.isArray(value);
  const fromDate = isControlled ? (value?.[0] ?? "") : internalFrom;
  const toDate = isControlled ? (value?.[1] ?? "") : internalTo;

  const {
    open,
    setOpen,
    formattedMonth,
    datesAsWeeks,
    currentMonth,
    currentYear,
    view,
    cycleView,
    selectMonth,
    selectYear,
    yearRangeStart,
    yearRange,
    prev,
    next,
    resetView,
    months,
    today,
    syncCalendarToValue,
    resetCalendarToToday,
  } = useDatePicker({
    value: fromDate,
    onChange: () => {},
  });

  const commitRange = useCallback(
    (from: string, to: string) => {
      setInternalFrom(from);
      setInternalTo(to);
      onChange?.([from, to]);
    },
    [onChange]
  );

  const isDateDisallowed = useCallback(
    (date: Date) => {
      if (!disallowAfter) return false;
      return getDateValue(date).slice(0, 10) > disallowAfter.slice(0, 10);
    },
    [disallowAfter]
  );

  const handleDateClick = useCallback(
    (date: Date): boolean => {
      if (isDateDisallowed(date)) {
        return false;
      }

      // Zero out time for date
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const v = getDateValue(d);
      syncCalendarToValue(v);

      // Starting a range commits the start date with a pending, empty end date.
      if (!fromDate || toDate) {
        commitRange(v, "");
        return false;
      }

      const isReversed = fromDate > v;
      commitRange(isReversed ? v : fromDate, isReversed ? fromDate : v);
      return true;
    },
    [commitRange, fromDate, isDateDisallowed, syncCalendarToValue, toDate]
  );

  const handleToday = useCallback(() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    const todayStr = getDateValue(d);
    syncCalendarToValue(todayStr);
    commitRange(todayStr, todayStr);
  }, [commitRange, syncCalendarToValue, today]);

  const clearDates = useCallback(() => {
    syncCalendarToValue("");
    resetCalendarToToday();
    commitRange("", "");
  }, [commitRange, resetCalendarToToday, syncCalendarToValue]);

  const selectDates = useCallback(() => {
    onChange?.([fromDate, toDate]);
    setOpen(false);
  }, [fromDate, onChange, setOpen, toDate]);

  const applyRange = useCallback(
    (from: string, to: string) => {
      syncCalendarToValue(from);
      commitRange(from, to);
    },
    [commitRange, syncCalendarToValue]
  );

  const isInRange = useCallback(
    (date: Date) => {
      if (!fromDate || !toDate) return false;
      return date >= getDate(fromDate) && date <= getDate(toDate);
    },
    [fromDate, toDate]
  );

  return {
    open,
    setOpen,
    fromDate,
    toDate,
    formattedMonth,
    datesAsWeeks,
    currentMonth,
    currentYear,
    view,
    cycleView,
    selectMonth,
    selectYear,
    yearRangeStart,
    yearRange,
    prev,
    next,
    resetView,
    months,
    today,
    handleToday,
    handleDateClick,
    clearDates,
    selectDates,
    applyRange,
    isInRange,
    isDateDisallowed,
  };
}
