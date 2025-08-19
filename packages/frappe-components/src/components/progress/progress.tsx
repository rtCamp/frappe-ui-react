import React from "react";
import { ProgressProps } from "./types";

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const sizeHeight: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
  xl: "h-3",
};

const Progress: React.FC<ProgressProps> = ({
  value,
  size = "sm",
  label = "",
  hint,
  intervals = false,
  intervalCount = 6,
  className = "",
}) => {
  // Classes for the progress bar container
  const indicatorContainerClasses = [
    sizeHeight[size],
    intervals ? "flex space-x-1" : "relative bg-surface-gray-2",
    "overflow-hidden rounded-xl",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // How many intervals are filled
  const filledIntervalCount =
    value > MAX_VALUE
      ? intervalCount
      : Math.round((value / MAX_VALUE) * intervalCount);

  return (
    <div className="w-full flex flex-col gap-2.5">
      {(label || hint) && (
        <div className="flex items-baseline justify-between">
          {label ? (
            <span className="text-base font-medium text-ink-gray-8">
              {label}
            </span>
          ) : (
            <span />
          )}

          {hint && <span className="self-end">{hint}</span>}
        </div>
      )}

      <div
        className={indicatorContainerClasses}
        aria-valuemax={MAX_VALUE}
        aria-valuemin={MIN_VALUE}
        aria-valuenow={value}
        role="progressbar"
      >
        {!intervals ? (
          <div
            className="h-full bg-surface-gray-7"
            style={{ width: `${value}%` }}
          />
        ) : (
          Array.from({ length: intervalCount }, (_, i) => (
            <div
              key={i}
              className={`h-full w-full ${
                i < filledIntervalCount
                  ? "bg-surface-gray-7"
                  : "bg-surface-gray-2"
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Progress;
