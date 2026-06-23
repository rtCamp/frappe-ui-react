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
  inlineLabel?: string;
  maxDuration?: string;
  hoursLeft?: string;
  variant?: "sm" | "md";
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const DurationInput = ({
  label,
  inlineLabel,
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
    <Slider.Root
      min={0}
      max={maxDurationInMinutes}
      step={SLIDER_STEP_MINUTES}
      value={sliderVal}
      onValueChange={handleSliderChange}
      onValueCommitted={() => {
        setIsDragging(false);
      }}
      disabled={disabled}
      className="space-y-1.5 relative"
    >
      {label ? (
        <div className="w-full flex justify-between text-sm font-normal text-ink-gray-5">
          <Slider.Label>{label}</Slider.Label>
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
        <Slider.Control
          className={cn(
            "flex items-center rounded relative overflow-hidden",
            "has-focus-visible:border-outline-gray-4 has-focus-visible:shadow-sm has-focus-visible:ring-2 has-focus-visible:ring-outline-gray-3"
          )}
          onPointerDown={() => setIsDragging(true)}
        >
          <Slider.Track
            className={cn("w-full bg-surface-gray-2 rounded", {
              "h-8": variant === "md",
              "h-7": variant === "sm",
            })}
          >
            {!disabled &&
              isDragging &&
              notchOffsets.map((pos) => (
                <div
                  key={pos}
                  className="absolute top-1/2 -translate-y-1/2 border-[0.5px] border-outline-gray-2 h-1.5 rounded"
                  style={{ left: `${pos}%` }}
                />
              ))}
            <Slider.Indicator
              className={cn(
                "rounded-l rounded-r bg-surface-gray-4 select-none",
                { "bg-surface-gray-3": disabled }
              )}
            />
            <Slider.Thumb
              className="rounded w-0.5 h-3 transition-colors bg-surface-gray-7/9 data-dragging:bg-surface-gray-7/36 -ml-1.25"
              aria-label="Duration"
            />
            {inlineLabel ? (
              <label
                htmlFor={sliderId}
                className="absolute -translate-y-1/2 top-1/2 left-2.5 text-ink-gray-8 text-sm flex items-center justify-center tabular-nums rounded-sm"
              >
                {inlineLabel}
              </label>
            ) : null}
          </Slider.Track>
        </Slider.Control>
        <input
          type="text"
          id={sliderId}
          className={cn(
            "absolute -translate-y-1/2 top-1/2 right-2.5 w-10 text-ink-gray-8 text-sm flex items-center justify-center tabular-nums rounded-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3 focus-visible:ring-offset-1",
            { "pointer-events-none text-ink-gray-3": disabled },
            { "text-base": variant === "md" }
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
    </Slider.Root>
  );
};

export default DurationInput;
