import { useState } from "react";
import { Popover } from "@base-ui/react/popover";

import type { DateRangePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue, parsePlacement } from "./utils";
import { Button } from "../button";
import { TextInput } from "../textInput";
import FeatherIcon from "../featherIcon";
import { cn } from "../../utils";

function useDateRangePicker({
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

  function commitRange(from: string, to: string) {
    setInternalFrom(from);
    setInternalTo(to);
    onChange?.([from, to]);
  }

  function handleDateClick(date: Date): boolean {
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
  }

  function handleToday() {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    const todayStr = getDateValue(d);
    syncCalendarToValue(todayStr);
    setIsExtendingRange(false);
    commitRange(todayStr, todayStr);
  }

  function clearDates() {
    syncCalendarToValue("");
    resetCalendarToToday();
    setIsExtendingRange(false);
    commitRange("", "");
  }

  function selectDates() {
    onChange?.([fromDate, toDate]);
    setOpen(false);
  }

  function applyRange(from: string, to: string) {
    syncCalendarToValue(from);
    setIsExtendingRange(false);
    commitRange(from, to);
  }

  function isInRange(date: Date) {
    if (!fromDate || !toDate) return false;
    return date >= getDate(fromDate) && date <= getDate(toDate);
  }

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

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  placeholder,
  disabled,
  formatter,
  placement,
  sideOffset = 4,
  label,
  footer,
  onChange,
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
    applyRange,
    isInRange,
  } = useDateRangePicker({
    value: Array.isArray(value) ? value : undefined,
    onChange,
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetView();
    }
  };

  const { side, align } = parsePlacement(placement);

  const from = fromDate ? fromDate.slice(0, 10) : "";
  const to = toDate ? toDate.slice(0, 10) : "";
  const displayValue = formatter
    ? formatter(from, to)
    : from && to
      ? `${from} to ${to}`
      : from || "";
  const openPicker = () => {
    if (!disabled) {
      setOpen(true);
    }
  };
  const closePicker = () => setOpen(false);
  const togglePicker = () => {
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen);
    }
  };
  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  };
  const handleChildTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  };
  const toggleViewLabel = "Toggle calendar view";
  const prevLabel =
    view === "date"
      ? "Previous month"
      : view === "month"
        ? "Previous year"
        : "Previous years";
  const nextLabel =
    view === "date"
      ? "Next month"
      : view === "month"
        ? "Next year"
        : "Next years";

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        disabled={disabled}
        nativeButton={false}
        render={
          children ? (
            <span>
              {children({
                isOpen: open,
                displayValue,
                disabled,
                openPicker,
                closePicker,
                togglePicker,
                onTriggerKeyDown: handleChildTriggerKeyDown,
              })}
            </span>
          ) : (
            <div className="flex w-full flex-col space-y-1.5">
              {label && (
                <label className="block text-xs text-ink-gray-5">{label}</label>
              )}
              <TextInput
                type="text"
                placeholder={placeholder}
                value={displayValue}
                disabled={disabled}
                readOnly
                onKeyDown={handleTriggerKeyDown}
                suffix={() => (
                  <FeatherIcon name="chevron-down" className="w-4 h-4" />
                )}
              />
            </div>
          )
        }
      />

      <Popover.Portal>
        <Popover.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-100"
        >
          <Popover.Popup
            className={cn(
              "min-w-60 w-fit select-none text-base text-ink-gray-9",
              "rounded-lg bg-surface-modal shadow-2xl border border-gray-200 z-100"
            )}
          >
            {/* Month Switcher */}
            <div className="flex items-center justify-between px-2 pt-2 gap-1">
              <Button
                size="sm"
                className="text-sm font-medium text-ink-gray-7"
                variant="ghost"
                aria-label={toggleViewLabel}
                onClick={cycleView}
              >
                {view === "date" && formattedMonth}
                {view === "month" && currentYear}
                {view === "year" &&
                  `${yearRangeStart} - ${yearRangeStart + 11}`}
              </Button>
              <div className="flex items-center">
                <Button
                  className="h-7 w-7"
                  icon="chevron-left"
                  aria-label={prevLabel}
                  onClick={prev}
                  variant="ghost"
                />
                <Button
                  className="text-xs"
                  variant="ghost"
                  onClick={() => {
                    handleToday();
                    setOpen(false);
                  }}
                >
                  Today
                </Button>
                <Button
                  className="h-7 w-7"
                  icon="chevron-right"
                  aria-label={nextLabel}
                  onClick={next}
                  variant="ghost"
                />
              </div>
            </div>
            {/* Calendar / Month Grid / Year Grid */}
            <div className="p-2">
              {view === "date" && (
                <div
                  className="flex flex-col items-center justify-center text-ink-gray-8"
                  role="grid"
                  aria-label="Calendar dates"
                >
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
                    <div key={i} className="flex items-center" role="row">
                      {week.map((date) => {
                        const val = getDateValue(date);
                        const today = getDate();
                        const isToday =
                          date.getDate() === today.getDate() &&
                          date.getMonth() === today.getMonth() &&
                          date.getFullYear() === today.getFullYear() &&
                          date.getMonth() === currentMonth - 1;
                        const isToDate =
                          toDate && getDateValue(date) === toDate;
                        const isFromDate =
                          fromDate && getDateValue(date) === fromDate;

                        return (
                          <button
                            type="button"
                            key={val}
                            className={`flex h-8 w-8 cursor-pointer items-center justify-center text-sm rounded hover:bg-surface-gray-2 focus:outline-none focus:ring-2 focus:ring-outline-gray-2 ${
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
                            role="gridcell"
                            aria-pressed={Boolean(isFromDate || isToDate)}
                            onClick={() => {
                              if (handleDateClick(date)) {
                                setOpen(false);
                              }
                            }}
                          >
                            {date.getDate()}
                          </button>
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
            {footer ? (
              <div className="border-t border-gray-200 p-2">
                {footer({
                  from: fromDate,
                  to: toDate,
                  setRange: applyRange,
                  clear: clearDates,
                  close: () => setOpen(false),
                })}
              </div>
            ) : (
              fromDate &&
              toDate && (
                <div className="flex justify-end p-2 gap-1 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      clearDates();
                      setOpen(false);
                    }}
                    variant="outline"
                  >
                    Clear
                  </Button>
                </div>
              )
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
