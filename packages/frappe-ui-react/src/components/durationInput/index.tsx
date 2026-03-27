/**
 * External dependencies.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@base-ui/react/slider";
import {
  clampHours,
  floatToTime,
  parseDurationToHours,
  SLIDER_STEP_MINUTES,
  snapToSliderStep,
} from "./utils";
import { cn } from "../../utils";

export interface DurationInputProps {
  label?: string;
  maxDurationInHours?: number;
  hoursLeft?: number;
  value?: number;
  variant?: "sm" | "md";
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const DurationInput = ({
  label,
  maxDurationInHours = 8,
  hoursLeft = maxDurationInHours,
  value = 0,
  variant = "sm",
  disabled = false,
  onChange,
}: DurationInputProps) => {
  const [inputValue, setInputValue] = useState(floatToTime(value, 2, 2));

  const durationInHours = useMemo(
    () => clampHours(value, maxDurationInHours),
    [value, maxDurationInHours]
  );

  const totalMinutes = maxDurationInHours * 60;
  const usedHours = durationInHours;
  const safeHoursLeft = Number.isFinite(hoursLeft)
    ? hoursLeft
    : maxDurationInHours;
  const remainingHours = safeHoursLeft - usedHours;
  const isOverHours = remainingHours < 0;
  const formattedRemainingHours = Number(remainingHours.toFixed(1));

  const handleSliderChange = (nextValue: number | number[]) => {
    const nextMinutes = Array.isArray(nextValue) ? nextValue[0] : nextValue;
    const clampedMinutes = Math.min(Math.max(nextMinutes, 0), totalMinutes);
    const nextHours = clampedMinutes / 60;
    setInputValue(floatToTime(nextHours, 2, 2));
    onChange?.(nextHours);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const parsedHours = parseDurationToHours(value);
    if (parsedHours === null) {
      return;
    }
    const clampedHours = clampHours(parsedHours, maxDurationInHours);
    onChange?.(clampedHours);
  };

  const handleInputBlur = () => {
    const parsedHours = parseDurationToHours(inputValue);
    if (parsedHours === null) {
      setInputValue(floatToTime(durationInHours, 2, 2));
      return;
    }
    const clampedHours = clampHours(parsedHours, maxDurationInHours);
    setInputValue(floatToTime(clampedHours, 2, 2));
    onChange?.(clampedHours);
  };

  const sliderValue = snapToSliderStep(durationInHours * 60);

  const [isDragging, setIsDragging] = useState(false);
  const dragTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDragStart = () => {
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    dragTimeoutRef.current = setTimeout(() => setIsDragging(false), 100);
  };

  const isFull = durationInHours >= maxDurationInHours;

  const totalSteps = totalMinutes / SLIDER_STEP_MINUTES;
  // Notch positions as percentages, excluding 0% and 100% edges
  const notchPositions = Array.from(
    { length: totalSteps - 1 },
    (_, i) => ((i + 1) / totalSteps) * 100
  );

  useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setInputValue(floatToTime(durationInHours, 2, 2));
  }, [durationInHours]);

  return (
    <div
      className={cn("space-y-1.5", {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      {label ? (
        <div className="w-full flex justify-between text-base font-normal text-ink-gray-5 ">
          <label>{label}</label>
          <p className={isOverHours ? "text-ink-red-4" : undefined}>
            {formattedRemainingHours}h left
          </p>
        </div>
      ) : null}
      <div className="relative">
        <Slider.Root
          defaultValue={0}
          min={0}
          max={totalMinutes}
          step={SLIDER_STEP_MINUTES}
          value={sliderValue}
          onValueChange={handleSliderChange}
          onValueCommitted={handleDragEnd}
          disabled={disabled}
        >
          <Slider.Control
            className="flex items-center rounded relative focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 overflow-hidden"
            onPointerDown={handleDragStart}
          >
            <Slider.Track
              className={cn("w-full bg-surface-gray-1 rounded", {
                "h-8": variant === "md",
                "h-7": variant === "sm",
              })}
            >
              <Slider.Indicator className="rounded-l bg-surface-gray-3 select-none" />
              {isFull && (
                <div className="absolute top-0 translate-y-1/2 right-1 rounded w-0.75 h-1/2 bg-[#00000017] pointer-events-none" />
              )}
              {isDragging &&
                notchPositions.map((pos) => (
                  <div
                    key={pos}
                    className="absolute top-1 bottom-1 w-px bg-surface-gray-4 pointer-events-none h-3/10"
                    style={{ left: `${pos}%` }}
                  />
                ))}
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
        <input
          type="text"
          className={cn(
            "absolute -translate-y-1/2 top-1/2 right-4 w-9 text-ink-gray-7 text-sm flex items-center justify-center",
            { "pointer-events-none": disabled }
          )}
          placeholder="00:00"
          value={inputValue}
          disabled={disabled}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
        />
      </div>
    </div>
  );
};

export default DurationInput;
