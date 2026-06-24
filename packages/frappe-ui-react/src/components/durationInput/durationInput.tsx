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
  formatHoursBalance,
  getPreviewMinutes,
  getSliderHours,
  getSliderMinutes,
  normalizeCommittedHours,
  SLIDER_STEP_MINUTES,
  sanitizeHoursInput,
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
  maxDuration = 8,
  hoursLeft = 8,
  value = 0,
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

  const maxDurationInHours = Math.max(maxDuration, 0);
  const maxDurationInMinutes = maxDurationInHours * 60;
  const hoursLeftValue = hoursLeft;
  const committedHours = normalizeCommittedHours(
    value,
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
    draftValue ??
    (dragValue !== null ? floatToTime(previewHours) : floatToTime(value));
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

      onChange(nextMinutes / 60);
    },
    [isDragging, isSmoothSnap, onChange]
  );

  const commitSliderValue = useCallback(
    (minutes: number) => {
      const nextValue = getSliderHours(minutes, snap, maxDurationInHours);

      setDragValue(null);

      if (nextValue !== value) {
        onChange(nextValue);
      }
    },
    [maxDurationInHours, onChange, snap, value]
  );

  const commitInputValue = useCallback(() => {
    const nextValue = normalizeCommittedHours(
      timeToFloat(draftValue ?? floatToTime(value)),
      maxDurationInHours,
      allowOverflow
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
              ? `${formatHoursBalance(Math.abs(hoursBalance))} over`
              : `${formatHoursBalance(hoursBalance)} left`}
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
            >
              <span
                className={cn(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 w-0.5 h-3 rounded transition-colors bg-surface-gray-7/9",
                  previewMinutes <= SLIDER_STEP_MINUTES ? "right-1" : "right-2",
                  isDragging && "bg-surface-gray-7/36",
                  previewMinutes === 0 && "invisible",
                  error && "bg-surface-red-4",
                  classNames.thumb
                )}
              />
            </Slider.Indicator>
            <Slider.Thumb
              className="size-0 opacity-0"
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
          inputMode="numeric"
          className={cn(
            durationInputVariants({ size, disabled, error }),
            classNames.input
          )}
          placeholder="00:00"
          value={inputVal}
          disabled={disabled}
          onFocus={() => {
            setDraftValue(floatToTime(value));
            setDragValue(null);
          }}
          onChange={(e) => {
            setDraftValue(sanitizeHoursInput(e.target.value));
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
