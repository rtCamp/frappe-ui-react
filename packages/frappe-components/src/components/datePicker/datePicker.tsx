import type { DatePickerProps } from "./types";
import { useDatePicker } from "./useDatePicker";
import { getDate, getDateValue } from "./utils";
import { Popover } from "../popover";
import { Button } from "../button";
import { TextInput } from "../textInput";

export const DatePicker: React.FC<DatePickerProps> = ({
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
    selectDate,
    prevMonth,
    nextMonth,
    formattedMonth,
    datesAsWeeks,
    currentMonth,
  } = useDatePicker({ value, onChange });

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
        <div className="absolute z-10 mt-1 w-fit select-none text-base text-ink-gray-9 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl border border-gray-200">
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
          {/* Date Input and Today */}
          <div className="flex items-center justify-center gap-1 p-1">
            <TextInput
              type="text"
              value={dateValue && formatter ? formatter(dateValue) : dateValue}
              onChange={(e) => selectDate(getDate(String(e.target.value)))}
            />
            <Button
              className="text-sm"
              onClick={() => {
                const today = getDate();
                today.setHours(0, 0, 0, 0);
                selectDate(today, true);
                togglePopover();
              }}
            >
              Today
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
                  const isSelected = dateValue === val;
                  return (
                    <div
                      key={val}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-surface-gray-2 ${
                        isToday ? "font-extrabold text-ink-gray-9" : ""
                      } ${isSelected ? "bg-surface-gray-2" : ""} ${
                        date.getMonth() !== currentMonth - 1
                          ? "text-ink-gray-4"
                          : ""
                      }`}
                      onClick={() => selectDate(date, true)}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Actions */}
          <div className="flex justify-end p-1">
            <Button
              className="text-sm"
              onClick={() => {
                // Clear the value
                onChange?.("");
                setOpen(false);
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
