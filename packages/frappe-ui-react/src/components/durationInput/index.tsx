/**
 * External dependencies.
 */
import { Slider } from "@base-ui/react/slider";
import { floatToTime, SLIDER_STEP_MINUTES, timeToFloat } from "./utils";
import { cn } from "../../utils";
import { useDurationSlider } from "./useDurationSlider";
import { useEffect, useState } from "react";

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
  const [inputVal, setInputVal] = useState(value);

  const { isDragging, setIsDragging, sliderVal, setSliderVal, notchOffsets } =
    useDurationSlider({
      initialValue: timeToFloat(value) * 60,
      maxDuration: timeToFloat(maxDuration) * 60,
      sliderStepInMins: SLIDER_STEP_MINUTES,
    });

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  useEffect(() => {
    onChange(floatToTime(sliderVal / 60));
  }, [sliderVal, onChange]);

  return (
    <div
      className={cn("space-y-1.5", {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      {label ? (
        <div className="w-full flex justify-between text-base font-normal text-ink-gray-5 ">
          <label>{label}</label>
          <p
            className={
              timeToFloat(hoursLeft) < sliderVal / 60
                ? "text-ink-red-4"
                : undefined
            }
          >
            {timeToFloat(hoursLeft) - sliderVal / 60}h left
          </p>
        </div>
      ) : null}
      <div className="relative">
        <Slider.Root
          defaultValue={0}
          min={0}
          max={timeToFloat(maxDuration) * 60}
          step={SLIDER_STEP_MINUTES}
          value={sliderVal}
          onValueChange={setSliderVal}
          onValueCommitted={() => setIsDragging(false)}
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
              {sliderVal === timeToFloat(maxDuration) * 60 && (
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
          onChange={(e) => {
            const filtered = e.target.value.replace(/[^0-9:]/g, "");
            setInputVal(filtered);
          }}
          onBlur={() => {
            onChange(inputVal);
            setSliderVal(timeToFloat(inputVal) * 60);
          }}
        />
      </div>
    </div>
  );
};

export default DurationInput;
