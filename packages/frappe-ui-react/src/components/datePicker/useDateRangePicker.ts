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
}: {
  value?: string[];
  onChange?: (v: string[]) => void;
}) {
  // Selection state, used only when the range is not driven by `value`.
  const [internalFrom, setInternalFrom] = useState<string>(value?.[0] || "");
  const [internalTo, setInternalTo] = useState<string>(value?.[1] || "");
  // Whether the next date click extends the current range instead of starting a new one.
  const [isExtendingRange, setIsExtendingRange] = useState(false);

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

  const handleDateClick = useCallback(
    (date: Date): boolean => {
      // Zero out time for date
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const v = getDateValue(d);
      syncCalendarToValue(v);

      // Commit the start as a single-day range so the value never lags behind the calendar.
      if (!isExtendingRange || !fromDate) {
        setIsExtendingRange(true);
        commitRange(v, v);
        return false;
      }

      const isReversed = fromDate > v;
      setIsExtendingRange(false);
      commitRange(isReversed ? v : fromDate, isReversed ? fromDate : v);
      return true;
    },
    [commitRange, fromDate, isExtendingRange, syncCalendarToValue]
  );

  const handleToday = useCallback(() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    const todayStr = getDateValue(d);
    syncCalendarToValue(todayStr);
    setIsExtendingRange(false);
    commitRange(todayStr, todayStr);
  }, [commitRange, syncCalendarToValue, today]);

  const clearDates = useCallback(() => {
    syncCalendarToValue("");
    resetCalendarToToday();
    setIsExtendingRange(false);
    commitRange("", "");
  }, [commitRange, resetCalendarToToday, syncCalendarToValue]);

  const selectDates = useCallback(() => {
    onChange?.([fromDate, toDate]);
    setOpen(false);
  }, [fromDate, onChange, setOpen, toDate]);

  const applyRange = useCallback(
    (from: string, to: string) => {
      syncCalendarToValue(from);
      setIsExtendingRange(false);
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
  };
}
