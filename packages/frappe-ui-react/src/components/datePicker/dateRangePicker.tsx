import { useState } from "react";

import type { DateRangePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue } from "./utils";
import { Popover } from "../popover";
import { Button } from "../button";
import { TextInput } from "../textInput";
import FeatherIcon from "../featherIcon";

function useDateRangePicker({
  value,
  onChange,
}: {
  value?: string[];
  onChange?: (v: string[]) => void;
}) {
  // Internal selection state
  const [fromDate, setFromDate] = useState<string>(value?.[0] || "");
  const [toDate, setToDate] = useState<string>(value?.[1] || "");

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
  } = useDatePicker({
    value: fromDate,
    onChange: () => {},
  });

  function handleDateClick(date: Date): boolean {
    // Zero out time for date
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const v = getDateValue(d);
    if (fromDate && toDate) {
      setFromDate(v);
      setToDate("");
    } else if (fromDate && !toDate) {
      setToDate(v);
      swapDatesIfNecessary(fromDate, v);
      onChange?.([fromDate, v]);
      return true;
    } else {
      setFromDate(v);
    }
    return false;
  }

  function swapDatesIfNecessary(a: string, b: string) {
    if (!a || !b) return;
    const from = getDate(a);
    from.setHours(0, 0, 0, 0);
    const to = getDate(b);
    to.setHours(0, 0, 0, 0);

    if (from > to) {
      setFromDate(getDateValue(to));
      setToDate(getDateValue(from));
    }
  }

  function handleToday() {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    const todayStr = getDateValue(d);
    setFromDate(todayStr);
    setToDate(todayStr);
  }

  function clearDates() {
    setFromDate("");
    setToDate("");
    onChange?.(["", ""]);
  }

  function selectDates() {
    onChange?.([fromDate, toDate]);
    setOpen(false);
  }

  function isInRange(date: Date) {
    if (!fromDate || !toDate) return false;
    return date >= getDate(fromDate) && date <= getDate(toDate);
  }

  return {
    open,
    setOpen,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
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
    isInRange,
  };
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  placeholder,
  formatter,
  placement,
  label,
  children,
}) => {
  const {
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
    handleToday,
    handleDateClick,
    clearDates,
    isInRange,
  } = useDateRangePicker({
    value: Array.isArray(value) ? value : undefined,
    onChange: undefined, // Only call onChange on second date selection
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetView();
    }
  };

  return (
    <Popover
      trigger="click"
      placement={placement || "bottom-start"}
      show={open}
      onUpdateShow={handleOpenChange}
      target={({ togglePopover }) => {
        const from = fromDate ? fromDate.slice(0, 10) : "";
        const to = toDate ? toDate.slice(0, 10) : "";
        const displayValue = formatter
          ? formatter(from, to)
          : from && to
            ? `${from} to ${to}`
            : from || "";

        if (children) {
          return children({ togglePopover, isOpen: open, displayValue });
        }

        return (
          <div className="flex w-full flex-col space-y-1.5">
            {label && (
              <label className="block text-xs text-ink-gray-5">{label}</label>
            )}
            <TextInput
              type="text"
              placeholder={placeholder}
              value={displayValue}
              suffix={() => (
                <FeatherIcon name="chevron-down" className="w-4 h-4" />
              )}
            />
          </div>
        );
      }}
      body={({ togglePopover }) => (
        <div className="absolute min-w-60 z-10 mt-2 w-fit select-none text-base text-ink-gray-9 rounded-lg bg-surface-modal shadow-2xl border border-gray-200">
          {/* Month Switcher */}
          <div className="flex items-center justify-between px-2 pt-2 gap-1">
            <Button
              size="sm"
              className="text-sm font-medium text-ink-gray-7"
              variant="ghost"
              onClick={cycleView}
            >
              {view === "date" && formattedMonth}
              {view === "month" && currentYear}
              {view === "year" && `${yearRangeStart} - ${yearRangeStart + 11}`}
            </Button>
            <div className="flex items-center">
              <Button
                className="h-7 w-7"
                icon="chevron-left"
                onClick={prev}
                variant="ghost"
              />
              <Button
                className="text-xs"
                variant="ghost"
                onClick={() => {
                  handleToday();
                  togglePopover();
                }}
              >
                Today
              </Button>
              <Button
                className="h-7 w-7"
                icon="chevron-right"
                onClick={next}
                variant="ghost"
              />
            </div>
          </div>
          {/* Calendar / Month Grid / Year Grid */}
          <div className="p-2">
            {view === "date" && (
              <div className="flex flex-col items-center justify-center text-ink-gray-8">
                <div className="flex items-center text-xs font-medium uppercase text-ink-gray-4 mb-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                      key={i}
                      className="flex h-6 w-8 items-center justify-center"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                {datesAsWeeks.map((week, i) => (
                  <div key={i} className="flex items-center">
                    {week.map((date) => {
                      const val = getDateValue(date);
                      const today = getDate();
                      const isToday =
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === currentMonth - 1;
                      const isToDate = toDate && getDateValue(date) === toDate;
                      const isFromDate =
                        fromDate && getDateValue(date) === fromDate;

                      return (
                        <div
                          key={val}
                          className={`flex h-8 w-8 cursor-pointer items-center justify-center text-sm rounded hover:bg-surface-gray-2 ${
                            date.getMonth() !== currentMonth - 1
                              ? "text-ink-gray-3"
                              : "text-ink-gray-8"
                          } ${
                            isToday ? "font-extrabold text-ink-gray-9" : ""
                          } ${
                            isInRange(date) && !isFromDate && !isToDate
                              ? "rounded-none bg-surface-gray-3"
                              : ""
                          } ${
                            (isFromDate || isToDate) && fromDate === toDate
                              ? "rounded bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                              : `${
                                  isFromDate
                                    ? "rounded-l-md rounded-r-none bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                                    : ""
                                } ${
                                  isToDate
                                    ? "rounded-r-md rounded-l-none  bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                                    : ""
                                } `
                          }
                          `}
                          onClick={() =>
                            handleDateClick(date) && togglePopover()
                          }
                        >
                          {date.getDate()}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {view === "month" && (
              <div
                className="grid grid-cols-3 gap-1"
                role="grid"
                aria-label="Select month"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                {months.map((m, i) => {
                  const isSelected = i === currentMonth - 1;
                  return (
                    <button
                      type="button"
                      key={m}
                      className={`py-2 text-sm rounded cursor-pointer text-center hover:bg-surface-gray-2 focus:outline-none focus:ring-2 focus:ring-outline-gray-2 ${
                        isSelected
                          ? "bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                          : ""
                      }`}
                      aria-selected={isSelected}
                      onClick={() => selectMonth(i)}
                    >
                      {m.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            )}

            {view === "year" && (
              <div
                className="grid grid-cols-3 gap-1"
                role="grid"
                aria-label="Select year"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                {yearRange.map((y) => {
                  const isSelected = y === currentYear;
                  return (
                    <button
                      type="button"
                      key={y}
                      className={`py-2 text-sm rounded cursor-pointer text-center hover:bg-surface-gray-2 focus:outline-none focus:ring-2 focus:ring-outline-gray-2 ${
                        isSelected
                          ? "bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                          : ""
                      }`}
                      aria-selected={isSelected}
                      onClick={() => selectYear(y)}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          {fromDate && toDate && (
            <div className="flex justify-end p-2 gap-1 border-t border-gray-200">
              <Button
                onClick={() => {
                  clearDates();
                  togglePopover();
                }}
                variant="outline"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      )}
    />
  );
};
