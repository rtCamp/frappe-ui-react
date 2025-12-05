import type { DatePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue } from "./utils";
import { Popover } from "../popover";
import { Button } from "../button";
import { TextInput } from "../textInput";
import FeatherIcon from "../featherIcon";

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  placeholder,
  formatter,
  placement,
  label,
  clearable = true,
  variant = "subtle",
  onChange,
  children,
}) => {
  const {
    open,
    setOpen,
    dateValue,
    selectDate,
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
  } = useDatePicker({ value, onChange });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetView();
    }
  };

  const displayValue =
    dateValue && formatter ? formatter(dateValue) : dateValue;

  return (
    <Popover
      trigger="click"
      placement={placement || "bottom-start"}
      show={open}
      onUpdateShow={handleOpenChange}
      target={({ togglePopover }) =>
        children ? (
          children({ togglePopover, isOpen: open, displayValue })
        ) : (
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
              variant={variant}
            />
          </div>
        )
      }
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
              {!clearable && (
                <Button
                  className="text-xs"
                  onClick={() => {
                    const today = getDate();
                    today.setHours(0, 0, 0, 0);
                    selectDate(today, true);
                    togglePopover();
                  }}
                  variant="ghost"
                >
                  Today
                </Button>
              )}
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
              <div role="grid" aria-label="Calendar dates">
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
          {clearable && (
            <div className="flex justify-between p-2 gap-1 border-t border-gray-200">
              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    const today = getDate();
                    today.setHours(0, 0, 0, 0);
                    selectDate(today, true);
                    togglePopover();
                  }}
                  variant="outline"
                >
                  Today
                </Button>
                <Button
                  onClick={() => {
                    const today = getDate();
                    today.setDate(today.getDate() + 1);
                    today.setHours(0, 0, 0, 0);
                    selectDate(today, true);
                    togglePopover();
                  }}
                  variant="outline"
                >
                  Tomorrow
                </Button>
              </div>
              <Button
                onClick={() => {
                  // Clear the value
                  onChange?.("");
                  setOpen(false);
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
