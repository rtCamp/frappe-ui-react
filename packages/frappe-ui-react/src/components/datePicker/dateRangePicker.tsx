/**
 * External dependencies.
 */
import { useCallback } from "react";
import { Popover } from "@base-ui/react/popover";

/**
 * Internal dependencies.
 */
import type { DateRangePickerProps } from "./types";
import { useDateRangePicker } from "./useDateRangePicker";
import { getDate, getDateValue, parsePlacement } from "./utils";
import { Button } from "../button";
import { TextInput } from "../textInput";
import FeatherIcon from "../featherIcon";
import { cn } from "../../utils";

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  placeholder,
  disabled,
  disallowAfter,
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
    isDateDisallowed,
  } = useDateRangePicker({
    value: Array.isArray(value) ? value : undefined,
    onChange,
    disallowAfter,
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetView();
      }
    },
    [resetView, setOpen]
  );

  const openPicker = useCallback(() => {
    if (!disabled) {
      setOpen(true);
    }
  }, [disabled, setOpen]);

  const closePicker = useCallback(() => setOpen(false), [setOpen]);

  const togglePicker = useCallback(() => {
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen);
    }
  }, [disabled, setOpen]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPicker();
      }
    },
    [disabled, openPicker]
  );

  const { side, align } = parsePlacement(placement);

  const from = fromDate ? fromDate.slice(0, 10) : "";
  const to = toDate ? toDate.slice(0, 10) : "";
  const displayValue = formatter
    ? formatter(from, to)
    : from && to
      ? `${from} to ${to}`
      : from || "";
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
                onTriggerKeyDown: handleTriggerKeyDown,
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
                        const isDisallowed = isDateDisallowed(date);

                        return (
                          <button
                            type="button"
                            key={val}
                            disabled={isDisallowed}
                            className={`flex h-8 w-8 items-center justify-center text-sm rounded focus:outline-none focus:ring-2 focus:ring-outline-gray-2 ${
                              isDisallowed
                                ? "cursor-not-allowed"
                                : "cursor-pointer hover:bg-surface-gray-2"
                            } ${
                              isDisallowed ||
                              date.getMonth() !== currentMonth - 1
                                ? "text-ink-gray-3"
                                : "text-ink-gray-8"
                            } ${isToday ? "font-extrabold text-ink-gray-9" : ""} ${
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
