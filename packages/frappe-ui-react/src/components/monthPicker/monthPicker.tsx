/**
 * External dependencies.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { dayjs } from "../../utils/dayjs";
import { Popover } from "../popover";
import { Button } from "../button";
import { MonthPickerProps } from "./types";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthPicker = ({
  value,
  placeholder = "Select month",
  className,
  placement,
  onChange,
}: MonthPickerProps) => {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const parseValue = useCallback((val: string) => {
    if (!val) return null;
    const parsed = dayjs(val, "MMMM YYYY");
    if (parsed.isValid()) {
      return { month: parsed.format("MMMM"), year: parsed.year() };
    }
    return null;
  }, []);

  const yearRangeStart = useMemo(
    () => currentYear - (currentYear % 12),
    [currentYear]
  );

  const yearRange = useMemo(
    () => Array.from({ length: 12 }, (_, i) => yearRangeStart + i),
    [yearRangeStart]
  );

  const pickerList = useMemo(
    () => (viewMode === "year" ? yearRange : MONTHS),
    [viewMode, yearRange]
  );

  const toggleViewMode = useCallback(() => {
    setViewMode((prevMode) => (prevMode === "month" ? "year" : "month"));
  }, []);

  const prev = useCallback(() => {
    setCurrentYear((y) => (viewMode === "year" ? y - 12 : y - 1));
  }, [viewMode]);

  const next = useCallback(() => {
    setCurrentYear((y) => (viewMode === "year" ? y + 12 : y + 1));
  }, [viewMode]);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setViewMode("month");
  }, []);

  const handleOnClick = useCallback(
    (v: string | number) => {
      const parts = (value || "").split(" ");
      const indexToModify = viewMode === "year" ? 1 : 0;
      parts[indexToModify] = String(v);
      const newValue = parts.join(" ");
      onChange?.(newValue);
    },
    [value, viewMode, onChange]
  );

  useEffect(() => {
    const parsed = parseValue(value || "");
    if (parsed) {
      setCurrentYear(parsed.year);
    }
  }, [value, parseValue]);

  return (
    <Popover
      trigger="click"
      placement={placement || "bottom-start"}
      show={open}
      onUpdateShow={handleOpenChange}
      target={({ togglePopover }) => (
        <Button
          onClick={togglePopover}
          className={clsx("w-full justify-between!", className)}
          iconRight={() => <Calendar className="w-4 h-4" />}
        >
          {value || placeholder}
        </Button>
      )}
      popoverClass="w-min!"
      body={() => (
        <div className="mt-2 w-max content shadow-xl rounded-lg border border-outline-gray-1 bg-surface-modal p-2">
          <div className="flex gap-2 justify-between">
            <Button variant="ghost" onClick={prev}>
              <ChevronLeft className="w-4 h-4 text-ink-gray-5" />
            </Button>

            <Button onClick={toggleViewMode}>
              {viewMode === "month"
                ? (value || "").split(" ")[1] || currentYear
                : `${yearRangeStart} - ${yearRangeStart + 11}`}
            </Button>

            <Button variant="ghost" onClick={next}>
              <ChevronRight className="w-4 h-4 text-ink-gray-5" />
            </Button>
          </div>

          <hr className="my-2 border-outline-gray-1" />

          <div className="grid grid-cols-3 gap-3">
            {pickerList.map((month, index) => (
              <Button
                key={index}
                onClick={() => handleOnClick(month)}
                variant={(value || "").includes(String(month)) ? "solid" : "ghost"}
                className="text-sm text-ink-gray-9"
              >
                {viewMode === "month" ? (month as string).slice(0, 3) : month}
              </Button>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default MonthPicker;
