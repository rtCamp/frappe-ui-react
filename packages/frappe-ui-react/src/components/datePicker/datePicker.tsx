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
            suffix={() => <FeatherIcon name="chevron-down" className="w-4 h-4" />}
          />
        </div>
      )}
      body={({ togglePopover }) => (
        <div className="absolute z-10 mt-2 w-fit select-none text-base text-ink-gray-9 rounded-lg bg-surface-modal shadow-2xl border border-gray-200">
          {/* Month Switcher */}
          <div className="flex items-center justify-between px-2 pt-2 text-ink-gray-4">
            <Button size="sm" className="text-sm" variant="ghost">
              {formattedMonth}
            </Button>
            <div className="flex">
              <Button
                className="h-7 w-7"
                icon="chevron-left"
                onClick={prevMonth}
                variant="ghost"
              />
              <Button
                className="h-7 w-7"
                icon="chevron-right"
                onClick={nextMonth}
                variant="ghost"
              />
            </div>
          </div>
          {/* Calendar */}
          <div className="flex flex-col items-center justify-center p-2 text-ink-gray-4">
            <div className="flex items-center text-sm uppercase">
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
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-surface-gray-2 text-sm ${
                        isToday ? "font-extrabold text-ink-gray-9" : ""
                      } ${isSelected ? "bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6" : ""} ${
                        date.getMonth() !== currentMonth - 1
                          ? "text-ink-gray-3"
                          : "text-ink-gray-8"
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
          <div className="flex justify-between p-2 border-t border-gray-200">
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
        </div>
      )}
    />
  );
};
