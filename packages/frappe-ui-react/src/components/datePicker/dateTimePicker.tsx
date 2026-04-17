import { useCallback, useMemo, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import type { DateTimePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue, parsePlacement } from "./utils";
import { Button } from "../button";
import { TextInput } from "../textInput";
import FeatherIcon from "../featherIcon";
import { cn } from "../../utils";

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  placeholder,
  formatter,
  placement,
  label,
  clearable = true,
  onChange,
  children,
}) => {
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const handleChange = useMemo(() => {
    if (!onChange) return undefined;
    return (val: string | string[]) => {
      if (typeof val === "string") {
        onChange(val);
      }
    };
  }, [onChange]);

  const {
    open,
    setOpen,
    dateValue,
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
    timeValue,
    timeOptions,
    selectTime,
    selectNow,
    selectTomorrow,
    clearValue,
    displayValue,
    selectDate,
  } = useDatePicker({
    value,
    onChange: handleChange,
    withTime: true,
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetView();
        setTimeDropdownOpen(false);
      }
    },
    [setOpen, resetView]
  );

  const formattedDisplayValue = formatter
    ? formatter(displayValue)
    : displayValue;

  const { side, align } = parsePlacement(placement);

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        render={
          children ? (
            <span>
              {children({
                isOpen: open,
                displayValue: formattedDisplayValue,
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
                value={formattedDisplayValue}
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
          sideOffset={4}
          className="z-100"
        >
          <Popover.Popup
            className={cn(
              "text-base select-none min-w-60 w-fit text-ink-gray-9",
              "rounded-lg border border-gray-200 shadow-2xl bg-surface-modal z-100"
            )}
          >
            {/* Header (Month/Year navigation) */}
            <div className="flex gap-1 justify-between items-center px-2 pt-2">
              <Button
                size="sm"
                className="text-sm font-medium text-ink-gray-7"
                variant="ghost"
                onClick={cycleView}
              >
                {view === "date" && formattedMonth}
                {view === "month" && currentYear}
                {view === "year" &&
                  `${yearRangeStart} - ${yearRangeStart + 11}`}
              </Button>
              <div className="flex items-center">
                <Button
                  className="w-7 h-7"
                  icon="chevron-left"
                  onClick={prev}
                  variant="ghost"
                />
                {!clearable && (
                  <Button
                    className="text-xs"
                    variant="outline"
                    onClick={selectNow}
                  >
                    Now
                  </Button>
                )}
                <Button
                  className="w-7 h-7"
                  icon="chevron-right"
                  onClick={next}
                  variant="ghost"
                />
              </div>
            </div>

            {/* Calendar / Month Grid / Year Grid */}
            <div className="p-2">
              {view === "date" && (
                <div role="grid" aria-label="Calendar dates">
                  <div className="flex items-center mb-1 text-xs font-medium uppercase text-ink-gray-4">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <div
                        key={i}
                        className="flex justify-center items-center w-8 h-6"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  {datesAsWeeks.map((week, i) => (
                    <div key={i} className="flex" role="row">
                      {week.map((date) => {
                        const val = getDateValue(date);
                        const today = getDate();
                        const isToday =
                          date.getDate() === today.getDate() &&
                          date.getMonth() === today.getMonth() &&
                          date.getFullYear() === today.getFullYear() &&
                          date.getMonth() === currentMonth - 1;
                        const isSelected = dateValue === val;
                        const inMonth = date.getMonth() === currentMonth - 1;
                        return (
                          <button
                            type="button"
                            key={val}
                            className={`flex h-8 w-8 items-center justify-center rounded cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-outline-gray-2 ${
                              inMonth ? "text-ink-gray-8" : "text-ink-gray-3"
                            } ${
                              isToday ? "font-extrabold text-ink-gray-9" : ""
                            } ${
                              isSelected
                                ? "bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                                : "hover:bg-surface-gray-2"
                            }`}
                            role="gridcell"
                            aria-selected={isSelected}
                            onClick={() => selectDate(date, true)}
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

            {/* Time Picker Section */}
            <div className="flex flex-col gap-2 p-2 pt-0 w-full">
              <Popover.Root
                open={timeDropdownOpen}
                onOpenChange={setTimeDropdownOpen}
              >
                <Popover.Trigger
                  render={
                    <div className="w-full">
                      <TextInput
                        type="text"
                        placeholder="Select Time"
                        value={timeValue}
                        suffix={() => (
                          <FeatherIcon
                            name="chevron-down"
                            className="w-4 h-4"
                          />
                        )}
                      />
                    </div>
                  }
                />
                <Popover.Portal>
                  <Popover.Positioner
                    side="bottom"
                    align="start"
                    sideOffset={4}
                  >
                    <Popover.Popup className="overflow-y-auto p-1 w-44 max-h-48 text-base rounded-lg border border-gray-200 shadow-2xl bg-surface-modal z-100">
                      {timeOptions.map((time) => {
                        const isSelected = timeValue === time;
                        return (
                          <Button
                            key={time}
                            aria-selected={isSelected}
                            size="sm"
                            className={`w-full justify-start ${
                              isSelected
                                ? "bg-surface-gray-3! text-ink-gray-8"
                                : ""
                            }`}
                            variant="ghost"
                            onClick={() => {
                              selectTime(time);
                              setTimeDropdownOpen(false);
                            }}
                          >
                            <span className="truncate">{time}</span>
                          </Button>
                        );
                      })}
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              </Popover.Root>
            </div>

            {/* Footer Actions */}
            {clearable && (
              <div className="flex gap-1 justify-between items-center p-2 border-t border-gray-200">
                <div className="flex gap-1">
                  <Button variant="outline" onClick={selectNow}>
                    Now
                  </Button>
                  <Button variant="outline" onClick={selectTomorrow}>
                    Tomorrow
                  </Button>
                </div>
                {(dateValue || timeValue) && (
                  <Button size="sm" variant="outline" onClick={clearValue}>
                    Clear
                  </Button>
                )}
              </div>
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
