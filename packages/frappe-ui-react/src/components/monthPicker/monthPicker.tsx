/**
 * External dependencies.
 */
import React, { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

/**
 * Internal dependencies.
 */
import { dayjs } from "../../utils/dayjs";
import { Popover } from "../popover";
import { Button } from "../button";
import type { MonthPickerProps } from "./types";
import { cn } from "../../utils";

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

const parseValue = (val: string | undefined) => {
  if (!val) return null;
  const parsed = dayjs(val, "MMMM YYYY");
  if (parsed.isValid()) {
    return { month: parsed.format("MMMM"), year: parsed.year() };
  }
  return null;
};

const MonthPicker = ({
  value,
  placeholder = "Select month",
  className,
  placement,
  onChange,
}: MonthPickerProps) => {
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [currentYear, setCurrentYear] = useState<number>(
    parseValue(value)?.year ?? new Date().getFullYear()
  );

  const yearRangeStart = currentYear - (currentYear % 12);

  const yearRange = useMemo(
    () => Array.from({ length: 12 }, (_, i) => yearRangeStart + i),
    [yearRangeStart]
  );

  const pickerList = viewMode === "year" ? yearRange : MONTHS;

  const toggleViewMode = useCallback(() => {
    setViewMode((prevMode) => (prevMode === "month" ? "year" : "month"));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentYear((y) => (viewMode === "year" ? y - 12 : y - 1));
  }, [viewMode]);

  const handleNext = useCallback(() => {
    setCurrentYear((y) => (viewMode === "year" ? y + 12 : y + 1));
  }, [viewMode]);

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, v: string | number) => {
      e.stopPropagation();
      const parsed = parseValue(value);
      let month = parsed?.month ?? "January";
      let year = parsed?.year ?? currentYear;

      if (viewMode === "month") {
        month = String(v);
      } else {
        year = Number(v);
        setCurrentYear(year);
      }
      if (viewMode === "year") {
        toggleViewMode();
      }
      onChange?.(`${month} ${year}`);
    },
    [value, viewMode, onChange, toggleViewMode, currentYear]
  );

  const handleOnOpen = useCallback(() => {
    setViewMode("month");
    const parsed = parseValue(value);
    if (parsed?.year) {
      setCurrentYear(parsed.year);
    }
  }, [value]);

  return (
    <Popover
      trigger="click"
      placement={placement || "bottom-start"}
      onOpen={handleOnOpen}
      target={({ togglePopover }) => (
        <Button
          onClick={togglePopover}
          className={cn(
            "w-full justify-between!",
            !value && "text-ink-gray-5!",
            className
          )}
          iconRight={() => <Calendar className="w-4 h-4" />}
        >
          {value || placeholder}
        </Button>
      )}
      popoverClass="w-min!"
      body={() => (
        <div
          className={cn(
            "mt-2 w-max content shadow-xl rounded-lg border border-outline-gray-1 bg-surface-modal p-2",
            viewMode === "year" && "min-w-52"
          )}
        >
          <div className="flex gap-2 justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              aria-label={
                viewMode === "month" ? "Previous month" : "Previous years"
              }
            >
              <ChevronLeft className="w-4 h-4 text-ink-gray-5" />
            </Button>

            <Button
              onClick={toggleViewMode}
              aria-label="Toggle between month and year selection"
            >
              {viewMode === "month"
                ? currentYear
                : `${yearRangeStart} - ${yearRangeStart + 11}`}
            </Button>

            <Button
              variant="ghost"
              onClick={handleNext}
              aria-label={viewMode === "month" ? "Next month" : "Next years"}
            >
              <ChevronRight className="w-4 h-4 text-ink-gray-5" />
            </Button>
          </div>

          <hr className="my-2 border-outline-gray-1" />

          <div className="grid grid-cols-3 gap-3">
            {pickerList.map((item) => {
              const isSelected = parseValue(value)?.[viewMode] === item;
              return (
                <Button
                  key={item}
                  onClick={(e) => handleOnClick(e, item)}
                  variant={isSelected ? "solid" : "ghost"}
                  className="text-sm text-ink-gray-9"
                >
                  {viewMode === "month" ? (item as string).slice(0, 3) : item}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
};

export default MonthPicker;
