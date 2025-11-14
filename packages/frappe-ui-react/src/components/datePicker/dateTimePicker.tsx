import type { DatePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue } from "./utils";
import { Popover } from "../popover";
import { Button } from "../button";
import { TextInput } from "../textInput";
import { useEffect, useMemo, useState } from "react";

function twoDigit(n: number) {
  return n.toString().padStart(2, "0");
}

function useDateTimePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) {
  const today = useMemo(() => getDate(), []);
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState<string>(
    typeof value === "string" ? value : ""
  );
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [currentMonth] = useState<number>(today.getMonth() + 1);

  useEffect(() => {
    if (typeof value === "string") setDateValue(value);
  }, [value]);

  useEffect(() => {
    if (dateValue) {
      const d = getDate(dateValue);
      setHour(d.getHours());
      setMinute(d.getMinutes());
      setSecond(d.getSeconds());
    }
  }, [dateValue]);

  const {
    datesAsWeeks,
    formattedMonth,
    prevMonth,
    nextMonth,
    today: todayDate,
  } = useDatePicker({
    value: dateValue,
    onChange: () => {},
  });

  function selectDate(date: Date | string, isNow = false) {
    const d = typeof date === "string" ? getDate(date) : date;
    let h = hour,
      m = minute,
      s = second;
    if (isNow) {
      h = d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
    }
    const val =
      d.getFullYear() +
      "-" +
      twoDigit(d.getMonth() + 1) +
      "-" +
      twoDigit(d.getDate()) +
      " " +
      twoDigit(h) +
      ":" +
      twoDigit(m) +
      ":" +
      twoDigit(s);
    setDateValue(val);
    onChange?.(val);
    setOpen(false);
  }

  function updateDate(val: string) {
    const d = getDate(val);
    setHour(d.getHours());
    setMinute(d.getMinutes());
    setSecond(d.getSeconds());
    selectDate(d);
  }

  function selectNow() {
    const now = getDate();
    setHour(now.getHours());
    setMinute(now.getMinutes());
    setSecond(now.getSeconds());
    selectDate(now, true);
  }

  function clearDate() {
    setDateValue("");
    onChange?.("");
    setOpen(false);
  }

  return {
    open,
    setOpen,
    dateValue,
    hour,
    setHour,
    minute,
    setMinute,
    second,
    setSecond,
    currentMonth,
    formattedMonth,
    prevMonth,
    nextMonth,
    datesAsWeeks,
    today: todayDate,
    selectDate,
    updateDate,
    selectNow,
    clearDate,
  };
}

export const DateTimePicker: React.FC<DatePickerProps> = ({
  value,
  placeholder,
  formatter,
  placement,
  label,
  onChange,
}) => {
  const {
    open,
    setOpen,
    dateValue,
    hour,
    setHour,
    minute,
    setMinute,
    second,
    setSecond,
    currentMonth,
    formattedMonth,
    prevMonth,
    nextMonth,
    datesAsWeeks,
    selectDate,
    updateDate,
    selectNow,
    clearDate,
  } = useDateTimePicker({
    value: typeof value === "string" ? value : "",
    onChange,
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
            value={dateValue && formatter ? formatter(dateValue) : dateValue}
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
          {/* Date Time Input and Now button */}
          <div className="flex items-center justify-center gap-1 p-1">
            <TextInput
              type="text"
              value={dateValue}
              onChange={(val) => updateDate(String(val))}
            />
            <Button
              className="text-sm"
              onClick={() => {
                selectNow();
                togglePopover();
              }}
            >
              Now
            </Button>
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
                  return (
                    <div
                      key={val}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-surface-gray-2 ${
                        date.getMonth() !== currentMonth - 1
                          ? "text-ink-gray-3"
                          : "text-ink-gray-9"
                      } ${isToday ? " font-extrabold text-ink-gray-9" : ""} ${
                        getDateValue(date) === dateValue.split(" ")[0]
                          ? " bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6"
                          : ""
                      }`}
                      onClick={() => {
                        selectDate(date);
                        togglePopover();
                      }}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Time Picker */}
          <div className="flex items-center justify-around gap-2 p-1">
            <div>
              {twoDigit(hour)} : {twoDigit(minute)} : {twoDigit(second)}
            </div>
            <div className="flex flex-col items-center justify-center accent-black dark:accent-white">
              <div className="slider flex min-h-4 items-center justify-center">
                <input
                  name="hours"
                  type="range"
                  min={0}
                  max={23}
                  step={1}
                  value={hour}
                  onChange={(e) => setHour(Number(e.target.value))}
                />
              </div>
              <div className="slider flex min-h-4 items-center justify-center">
                <input
                  name="minutes"
                  type="range"
                  min={0}
                  max={59}
                  step={1}
                  value={minute}
                  onChange={(e) => setMinute(Number(e.target.value))}
                />
              </div>
              <div className="slider flex min-h-4 items-center justify-center">
                <input
                  name="seconds"
                  type="range"
                  min={0}
                  max={59}
                  step={1}
                  value={second}
                  onChange={(e) => setSecond(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-end p-1">
            <Button
              className="text-sm"
              onClick={() => {
                clearDate();
                togglePopover();
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    />
  );
};
