/**
 * External dependencies.
 */
import { Slider } from "@base-ui/react/slider";
import {
  clampHours,
  floatToTime,
  SLIDER_STEP_MINUTES,
  timeToFloat,
} from "./utils";
import { cn } from "../../utils";
import { useDurationSlider } from "./useDurationSlider";
import { useCallback, useId, useState } from "react";

type SliderValue = number | readonly number[];

export interface DurationInputProps {
  label?: string;
  maxDuration?: string;
  hoursLeft?: string;
  variant?: "sm" | "md";
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const DurationInput = ({
  label,
  maxDuration = "08:00",
  hoursLeft = "08:00",
  value = "00:00",
  variant = "sm",
  disabled = false,
  onChange,
}: DurationInputProps) => {
  const sliderId = useId();
  const [draftValue, setDraftValue] = useState<string | null>(null);

  const maxDurationInHours = timeToFloat(maxDuration);
  const maxDurationInMinutes = maxDurationInHours * 60;
  const hoursLeftValue = timeToFloat(hoursLeft);
  const committedHours = clampHours(timeToFloat(value), maxDurationInHours);
  const committedMinutes = committedHours * 60;
  const sliderVal = committedMinutes;
  const inputVal = draftValue ?? value;

  const { isDragging, setIsDragging, notchOffsets } = useDurationSlider({
    maxDuration: maxDurationInMinutes,
    sliderStepInMins: SLIDER_STEP_MINUTES,
  });

  const getSliderMinutes = useCallback(
    (sliderValue: SliderValue) =>
      Array.isArray(sliderValue) ? (sliderValue[0] ?? 0) : sliderValue,
    []
  );

  const handleSliderChange = useCallback(
    (nextValue: SliderValue) => {
      onChange(floatToTime(getSliderMinutes(nextValue) / 60));
    },
    [getSliderMinutes, onChange]
  );

  const commitInputValue = useCallback(() => {
    const nextValue = floatToTime(
      clampHours(timeToFloat(draftValue ?? value), maxDurationInHours)
    );

    setDraftValue(null);

    if (nextValue !== value) {
      onChange(nextValue);
    }
  }, [draftValue, value, maxDurationInHours, onChange]);

  return (
    <div
      className={cn("space-y-1.5", {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      {label ? (
        <div className="w-full flex justify-between text-base font-normal text-ink-gray-5 ">
          <label htmlFor={sliderId}>{label}</label>
          <p
            className={
              hoursLeftValue < sliderVal / 60 ? "text-ink-red-4" : undefined
            }
          >
            {hoursLeftValue - sliderVal / 60}h left
          </p>
        </div>
      ) : null}
      <div className="relative">
        <Slider.Root
          id={sliderId}
          min={0}
          max={maxDurationInMinutes}
          step={SLIDER_STEP_MINUTES}
          value={sliderVal}
          onValueChange={handleSliderChange}
          onValueCommitted={() => {
            setIsDragging(false);
          }}
          disabled={disabled}
        >
          <Slider.Control
            className="flex items-center rounded relative focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 overflow-hidden"
            onPointerDown={() => setIsDragging(true)}
          >
            <Slider.Track
              className={cn("w-full bg-surface-gray-1 rounded", {
                "h-8": variant === "md",
                "h-7": variant === "sm",
              })}
            >
              <Slider.Indicator className="rounded-l bg-surface-gray-3 select-none" />
              {sliderVal === maxDurationInMinutes && (
                <div className="absolute top-0 translate-y-1/2 right-1 rounded w-0.75 h-1/2 bg-[#00000017] pointer-events-none" />
              )}
              {isDragging &&
                notchOffsets.map((pos) => (
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
          value={inputVal}
          disabled={disabled}
          onFocus={() => {
            setDraftValue(value);
          }}
          onChange={(e) => {
            const filtered = e.target.value.replace(/[^0-9:]/g, "");
            setDraftValue(filtered);
          }}
          onBlur={commitInputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }

            if (e.key === "Escape") {
              setDraftValue(null);
              e.currentTarget.blur();
            }
          }}
        />
      </div>
    </div>
  );
};

export default DurationInput;
