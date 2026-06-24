/**
 * External dependencies.
 */
import { useCallback, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { Slider } from "@base-ui/react/slider";

/**
 * Internal dependencies.
 */
import {
  clampHours,
  floatToTime,
  formatSliderMinutes,
  getPreviewMinutes,
  getSliderMinutes,
  normalizeCommittedHours,
  SLIDER_STEP_MINUTES,
  timeToFloat,
} from "./utils";
import type { DurationInputProps } from "./types";
import { cn } from "../../utils";
import { useDurationSlider } from "./useDurationSlider";
import { Spinner } from "../spinner";

type SliderValue = number | readonly number[];

const durationControlVariants = cva(
  "flex items-center rounded relative overflow-hidden has-focus-visible:border-outline-gray-4 has-focus-visible:shadow-sm has-focus-visible:ring-2 cursor-pointer data-dragging:cursor-grabbing data-disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        subtle: "",
        outline: "ring-1 ring-outline-gray-2",
      },
      error: {
        true: "has-focus-visible:ring-outline-red-2",
        false: "has-focus-visible:ring-outline-gray-3",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        error: true,
        className: "ring-outline-red-2",
      },
    ],
    defaultVariants: {
      variant: "subtle",
      error: false,
    },
  }
);

const durationTrackVariants = cva("w-full rounded transition-colors", {
  variants: {
    size: {
      sm: "h-7",
      md: "h-8",
    },
    variant: {
      subtle: "bg-surface-gray-2",
      outline: "bg-surface-white",
    },
    error: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "subtle",
      error: true,
      className: "bg-surface-red-2",
    },
    {
      variant: "outline",
      error: true,
      className: "bg-surface-white",
    },
  ],
  defaultVariants: {
    size: "sm",
    variant: "subtle",
    error: false,
  },
});

const durationIndicatorVariants = cva(
  "rounded-l rounded-r select-none cursor-grab",
  {
    variants: {
      disabled: {
        true: "bg-surface-gray-3",
        false: "",
      },
      variant: {
        subtle: "bg-surface-gray-4",
        outline: "bg-surface-gray-3",
      },
      error: {
        true: "bg-surface-red-3",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      error: false,
    },
  }
);

const durationInputVariants = cva(
  "absolute -translate-y-1/2 top-1/2 right-2.5 w-10 flex items-center justify-center tabular-nums rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
      },
      disabled: {
        true: "pointer-events-none text-ink-gray-3",
        false: "text-ink-gray-8",
      },
      error: {
        true: "focus-visible:ring-outline-red-2 focus-visible:ring-offset-surface-red-2",
        false: "focus-visible:ring-outline-gray-3",
      },
    },
    defaultVariants: {
      size: "sm",
      disabled: false,
      error: false,
    },
  }
);

const durationSpinnerVariants = cva(
  "absolute top-1/2 -translate-y-1/2 pointer-events-none text-ink-gray-8 size-4",
  {
    variants: {
      size: {
        sm: "right-14",
        md: "right-15",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const DurationInput = ({
  label,
  inlineLabel,
  maxDuration = "08:00",
  hoursLeft = "08:00",
  value = "00:00",
  snap = "step",
  size = "sm",
  variant = "subtle",
  disabled = false,
  loading = false,
  error = false,
  allowOverflow = false,
  className,
  classNames = {},
  onChange,
}: DurationInputProps) => {
  const sliderId = useId();
  const [draftValue, setDraftValue] = useState<string | null>(null);
  const [dragValue, setDragValue] = useState<number | null>(null);

  const maxDurationInHours = timeToFloat(maxDuration);
  const maxDurationInMinutes = maxDurationInHours * 60;
  const hoursLeftValue = timeToFloat(hoursLeft);
  const committedHours = normalizeCommittedHours(
    timeToFloat(value),
    maxDurationInHours,
    allowOverflow
  );
  const sliderHours = clampHours(committedHours, maxDurationInHours);
  const committedMinutes = sliderHours * 60;
  const isSmoothSnap = snap === "smooth";
  const sliderVal = dragValue ?? committedMinutes;
  const previewMinutes = getPreviewMinutes(sliderVal, snap);
  const previewHours =
    dragValue !== null ? previewMinutes / 60 : committedHours;
  const inputVal =
    draftValue ?? (dragValue !== null ? floatToTime(previewHours) : value);
  const hoursBalance = hoursLeftValue - previewHours;
  const isOverHours = hoursBalance < 0;
  const accessibleLabel =
    (typeof label === "string" && label) || inlineLabel || "Duration";

  const { isDragging, setIsDragging, notchOffsets } = useDurationSlider({
    maxDuration: maxDurationInMinutes,
    sliderStepInMins: SLIDER_STEP_MINUTES,
  });

  const handleSliderChange = useCallback(
    (nextValue: SliderValue) => {
      const nextMinutes = getSliderMinutes(nextValue);

      if (isSmoothSnap && isDragging) {
        setDragValue(nextMinutes);
        return;
      }

      onChange(floatToTime(nextMinutes / 60));
    },
    [isDragging, isSmoothSnap, onChange]
  );

  const commitSliderValue = useCallback(
    (minutes: number) => {
      const nextValue = formatSliderMinutes(minutes, snap, maxDurationInHours);

      setDragValue(null);

      if (nextValue !== value) {
        onChange(nextValue);
      }
    },
    [maxDurationInHours, onChange, snap, value]
  );

  const commitInputValue = useCallback(() => {
    const nextValue = floatToTime(
      normalizeCommittedHours(
        timeToFloat(draftValue ?? value),
        maxDurationInHours,
        allowOverflow
      )
    );

    setDraftValue(null);
    setDragValue(null);

    if (nextValue !== value) {
      onChange(nextValue);
    }
  }, [allowOverflow, draftValue, value, maxDurationInHours, onChange]);

  const resetInputDraft = useCallback(() => {
    setDraftValue(null);
    setDragValue(null);
  }, []);

  return (
    <Slider.Root
      min={0}
      max={maxDurationInMinutes}
      step={isSmoothSnap && isDragging ? 1 : SLIDER_STEP_MINUTES}
      value={sliderVal}
      onValueChange={handleSliderChange}
      onValueCommitted={() => {
        if (isSmoothSnap && dragValue !== null) {
          commitSliderValue(dragValue);
        }

        setIsDragging(false);
      }}
      disabled={disabled}
      className={cn(
        "space-y-1.5 relative",
        disabled && "opacity-90 pointer-events-none",
        className,
        classNames.root
      )}
    >
      {label ? (
        <div
          className={cn(
            "w-full flex justify-between text-sm font-normal text-ink-gray-5",
            classNames.header
          )}
        >
          <Slider.Label className={cn(classNames.label)}>{label}</Slider.Label>
          <p
            className={cn(
              isOverHours && "text-ink-red-4",
              classNames.hoursLeft
            )}
          >
            {isOverHours
              ? `${Math.abs(hoursBalance)}h over`
              : `${hoursBalance}h left`}
          </p>
        </div>
      ) : null}
      <div className="relative">
        <Slider.Control
          className={cn(
            durationControlVariants({ variant, error }),
            classNames.control
          )}
          onPointerDown={() => setIsDragging(true)}
        >
          <Slider.Track
            className={cn(
              durationTrackVariants({ size, variant, error }),
              classNames.track
            )}
          >
            {!disabled &&
              isDragging &&
              notchOffsets.map((pos) => (
                <div
                  key={pos}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 border-[0.5px] border-outline-gray-2 h-1.5 rounded",
                    error && "border-outline-red-1"
                  )}
                  style={{ left: `${pos}%` }}
                />
              ))}
            <Slider.Indicator
              className={cn(
                durationIndicatorVariants({ disabled, error, variant }),
                classNames.indicator
              )}
            />
            <Slider.Thumb
              className={cn(
                "rounded w-0.5 h-3 transition-colors bg-surface-gray-7/9 data-dragging:bg-surface-gray-7/36 -ml-1.25 cursor-grab data-dragging:cursor-grabbing",
                error && "bg-surface-red-4 data-dragging:bg-surface-red-4",
                classNames.thumb
              )}
              aria-label={accessibleLabel}
            />
            {inlineLabel ? (
              <label
                htmlFor={sliderId}
                className={cn(
                  "absolute -translate-y-1/2 top-1/2 left-2.5 text-sm flex items-center justify-center tabular-nums rounded-sm",
                  disabled ? "text-ink-gray-5" : "text-ink-gray-8",
                  classNames.inlineLabel
                )}
              >
                {inlineLabel}
              </label>
            ) : null}
          </Slider.Track>
        </Slider.Control>
        {loading ? (
          <Spinner
            className={cn(
              durationSpinnerVariants({ size }),
              classNames.spinner
            )}
          />
        ) : null}
        <input
          type="text"
          id={sliderId}
          className={cn(
            durationInputVariants({ size, disabled, error }),
            classNames.input
          )}
          placeholder="00:00"
          value={inputVal}
          disabled={disabled}
          onFocus={() => {
            setDraftValue(value);
            setDragValue(null);
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
              e.preventDefault();
              resetInputDraft();
            }
          }}
        />
      </div>
    </Slider.Root>
  );
};

export default DurationInput;
