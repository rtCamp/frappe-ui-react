import { useEffect, useMemo, useState } from "react";

import type { DatePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue } from "./utils";
import { Popover } from "../popover";
import { Button } from "../button";
import { TextInput } from "../textInput";

function useDateRangePicker({
  value,
  onChange,
}: {
  value?: string[];
  onChange?: (v: string[]) => void;
}) {
  const today = useMemo(() => getDate(), []);
  const [open, setOpen] = useState(false);
  // Internal selection state
  const [fromDate, setFromDate] = useState<string>(value?.[0] || "");
  const [toDate, setToDate] = useState<string>(value?.[1] || "");
  // Applied (confirmed) state
  const [appliedFromDate, setAppliedFromDate] = useState<string>(
    value?.[0] || ""
  );
  const [appliedToDate, setAppliedToDate] = useState<string>(value?.[1] || "");
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );

  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      setFromDate(value[0] || "");
      setToDate(value[1] || "");
      setAppliedFromDate(value[0] || "");
      setAppliedToDate(value[1] || "");
    }
  }, [value]);

  const {
    datesAsWeeks,
    formattedMonth,
    prevMonth,
    nextMonth,
    today: todayDate,
  } = useDatePicker({
    value: fromDate,
    onChange: () => {},
  });

  function handleDateClick(date: Date) {
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
    } else {
      setFromDate(v);
    }
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

  function clearDates() {
    setFromDate("");
    setToDate("");
    setAppliedFromDate("");
    setAppliedToDate("");
    onChange?.(["", ""]);
  }

  function selectDates() {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
    onChange?.([fromDate, toDate]);
    setOpen(false);
  }

  function isInRange(date: Date) {
    if (!fromDate || !toDate) return false;
    return date >= getDate(fromDate) && date <= getDate(toDate);
  }

  function selectCurrentMonthYear() {
    const date = toDate ? getDate(toDate) : today;
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth() + 1);
  }

  return {
    open,
    setOpen,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    appliedFromDate,
    appliedToDate,
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    formattedMonth,
    prevMonth,
    nextMonth,
    datesAsWeeks,
    today: todayDate,
    handleDateClick,
    clearDates,
    selectDates,
    isInRange,
    selectCurrentMonthYear,
  };
}

export const DateRangePicker: React.FC<DatePickerProps> = ({
  value,
  placeholder,
  placement,
  label,
  onChange,
}) => {
  const {
    open,
    setOpen,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    appliedFromDate,
    appliedToDate,
    currentMonth,
    formattedMonth,
    prevMonth,
    nextMonth,
    datesAsWeeks,
    handleDateClick,
    clearDates,
    isInRange,
  } = useDateRangePicker({
    value: Array.isArray(value) ? value : undefined,
    onChange: undefined, // Only call onChange on Apply
  });

  return (
    <Popover
      trigger="click"
      placement={placement || "bottom-start"}
      show={open}
      onUpdateShow={setOpen}
      target={() => (
        <div className="flex flex-col space-y-1.5">
          {label && (
            <label className="block text-xs text-ink-gray-5">{label}</label>
          )}
          <TextInput
            type="text"
            placeholder={placeholder}
            value={(() => {
              const from = appliedFromDate ? appliedFromDate.slice(0, 10) : "";
              const to = appliedToDate ? appliedToDate.slice(0, 10) : "";
              if (from && to) return `${from}, ${to}`;
              if (from) return from;
              return "";
            })()}
          />
        </div>
      )}
      body={({ togglePopover }) => (
        <div className="w-fit select-none text-base text-ink-gray-9 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl border border-gray-200 focus:outline-none">
          {/* Month Switcher */}
          <div className="flex items-center p-1 text-ink-gray-4">
            <Button className="h-7 w-7" onClick={prevMonth} variant="ghost">
              {"<"}
            </Button>
            <div className="flex-1 text-center text-base font-medium text-ink-gray-6">
              {formattedMonth}
            </div>
            <Button className="h-7 w-7" onClick={nextMonth} variant="ghost">
              {">"}
            </Button>
          </div>
          {/* Date Range Inputs */}
          <div className="flex items-center justify-center gap-1 p-1">
            <TextInput
              type="text"
              value={fromDate ? fromDate.slice(0, 10) : ""}
              onChange={(val) => setFromDate(String(val).slice(0, 10))}
            />
            <TextInput
              type="text"
              value={toDate ? toDate.slice(0, 10) : ""}
              onChange={(val) => setToDate(String(val).slice(0, 10))}
            />
          </div>
          {/* Calendar */}
          <div className="flex flex-col items-center justify-center p-1 text-ink-gray-8">
            <div className="flex items-center text-xs uppercase">
              {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
                <div
                  key={i}
                  className="flex h-6 w-8 items-center justify-center text-center"
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
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-surface-gray-2 ${
                        date.getMonth() !== currentMonth - 1
                          ? "text-ink-gray-3"
                          : "text-ink-gray-9"
                      } ${isToday ? "font-extrabold text-ink-gray-9" : ""} ${
                        isInRange(date) && !isFromDate && !isToDate
                          ? "rounded-none bg-surface-gray-3"
                          : ""
                      } ${
                        isFromDate
                          ? "rounded-l-md rounded-r-none bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                          : ""
                      } ${
                        isToDate
                          ? "rounded-r-md rounded-l-none  bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                          : ""
                      }`}
                      onClick={() => handleDateClick(date)}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Actions */}
          <div className="flex justify-end space-x-1 p-1">
            <Button
              onClick={() => {
                clearDates();
                togglePopover();
              }}
            >
              Clear
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                onChange?.([fromDate, toDate]);
                togglePopover();
              }}
              disabled={!fromDate || !toDate}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    />
  );
};
