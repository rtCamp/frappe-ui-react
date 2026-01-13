import { useCallback, useEffect, useRef, useState } from "react";
import { SliderProps } from "./types";
import clsx from "clsx";
import Tooltip from "../tooltip/tooltip";

const Slider = ({
  min,
  max,
  value,
  step = 1,
  range = false,
  knob = true,
  tooltip = false,
  showValue = false,
  size = "md",
  disabled = false,
  className,
  onChange,
}: SliderProps) => {
  const [minVal, setMinVal] = useState(
    typeof value === "object" ? value.min : value ?? min
  );
  const [maxVal, setMaxVal] = useState(
    typeof value === "object" ? value.max : max
  );
  const [showMinTooltip, setShowMinTooltip] = useState(false);
  const [showMaxTooltip, setShowMaxTooltip] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tooltipHelperRef = useRef<HTMLDivElement>(null);
  const [thumbWidth, setThumbWidth] = useState(16);

  const trackHeightClasses = {
    sm: "h-0.5",
    md: "h-1",
    lg: "h-2",
    xl: "h-2.5",
  }[size];

  const fontSizeClasses = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-base",
    xl: "text-base",
  }[size];

  const thumbSizeClasses = {
    sm: clsx(
      "[&::-webkit-slider-thumb]:h-3.5",
      "[&::-webkit-slider-thumb]:w-3.5",
      "[&::-moz-range-thumb]:h-3.5",
      "[&::-moz-range-thumb]:w-3.5"
    ),
    md: clsx(
      "[&::-webkit-slider-thumb]:h-4",
      "[&::-webkit-slider-thumb]:w-4",
      "[&::-moz-range-thumb]:h-4",
      "[&::-moz-range-thumb]:w-4"
    ),
    lg: clsx(
      "[&::-webkit-slider-thumb]:h-5",
      "[&::-webkit-slider-thumb]:w-5",
      "[&::-moz-range-thumb]:h-5",
      "[&::-moz-range-thumb]:w-5"
    ),
    xl: clsx(
      "[&::-webkit-slider-thumb]:h-6",
      "[&::-webkit-slider-thumb]:w-6",
      "[&::-moz-range-thumb]:h-6",
      "[&::-moz-range-thumb]:w-6"
    ),
  }[size];

  const tooltipHelperClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-6 w-6",
  }[size];

  const getPercent = useCallback(
    (value: number) => {
      if (!trackRef.current) {
        return ((value - min) / (max - min)) * 100;
      }

      const trackWidth = trackRef.current.offsetWidth;
      const percent = (value - min) / (max - min);
      const availableWidth = trackWidth - thumbWidth;
      const thumbOffset = thumbWidth / 2;

      return ((percent * availableWidth + thumbOffset) / trackWidth) * 100;
    },
    [min, max, thumbWidth]
  );

  // Measure thumb width to position tooltips correctly
  useEffect(() => {
    if (!tooltipHelperRef.current || !trackRef.current) return;

    if (!knob) {
      setThumbWidth(0);
      return;
    }

    const width = tooltipHelperRef.current.offsetWidth;
    setThumbWidth(width);
  }, [size, knob]);

  const thumbClasses = clsx(
    "w-full absolute outline-none appearance-none pointer-events-none",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto",
    knob
      ? disabled
        ? "[&::-webkit-slider-thumb]:bg-surface-gray-4"
        : "[&::-webkit-slider-thumb]:bg-white"
      : "[&::-webkit-slider-thumb]:bg-transparent",
    knob && "[&::-webkit-slider-thumb]:border-none",
    knob && "[&::-webkit-slider-thumb]:rounded-full",
    knob && "[&::-webkit-slider-thumb]:shadow-[0_0_1px_1px_#ced4da]",
    !disabled && knob && "[&::-webkit-slider-thumb]:cursor-pointer",
    knob && "[&::-webkit-slider-thumb]:relative",

    "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto",
    knob
      ? disabled
        ? "[&::-moz-range-thumb]:bg-surface-gray-4"
        : "[&::-moz-range-thumb]:bg-white"
      : "[&::-moz-range-thumb]:bg-transparent",
    knob && "[&::-moz-range-thumb]:border-none",
    knob && "[&::-moz-range-thumb]:rounded-full",
    knob && "[&::-moz-range-thumb]:shadow-[0_0_1px_1px_#ced4da]",
    !disabled && knob && "[&::-moz-range-thumb]:cursor-pointer",
    knob && "[&::-moz-range-thumb]:relative",
    thumbSizeClasses,
    trackHeightClasses
  );

  useEffect(() => {
    if (!range) return;

    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent, range]);

  useEffect(() => {
    if (range) {
      onChange?.({ min: minVal, max: maxVal });
    } else {
      onChange?.(minVal);
    }
  }, [minVal, maxVal, onChange, range]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = range
      ? Math.min(Number(event.target.value), maxVal - step)
      : Number(event.target.value);
    setMinVal(newValue);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(event.target.value), minVal + step);
    setMaxVal(newValue);
  };

  return (
    <div
      className={clsx(
        "w-full relative flex flex-col items-center justify-center",
        className
      )}
    >
      <div className={clsx("w-full relative", trackHeightClasses)}>
        <div className="w-full h-full absolute flex items-center justify-between">
          {range && (
            <Tooltip
              text={minVal.toString()}
              placement="top"
              hoverDelay={0}
              open={tooltip && showMinTooltip}
            >
              <div
                className="absolute pointer-events-none -translate-x-1/2"
                style={{
                  left: `${getPercent(minVal)}%`,
                }}
              >
                <div ref={tooltipHelperRef} className={tooltipHelperClasses} />
              </div>
            </Tooltip>
          )}
          <Tooltip
            text={(range ? maxVal : minVal).toString()}
            placement="top"
            hoverDelay={0}
            open={tooltip && showMaxTooltip}
          >
            <div
              className="absolute pointer-events-none -translate-x-1/2"
              style={{
                left: `${getPercent(range ? maxVal : minVal)}%`,
              }}
            >
              <div
                ref={range ? undefined : tooltipHelperRef}
                className={tooltipHelperClasses}
              />
            </div>
          </Tooltip>
        </div>
        {range && (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMinChange}
            onPointerDown={() => setShowMinTooltip(true)}
            onPointerUp={() => setShowMinTooltip(false)}
            onPointerLeave={() => setShowMinTooltip(false)}
            disabled={disabled}
            className={clsx(thumbClasses, minVal > max - 100 ? "z-5" : "z-3")}
            aria-label="Minimum value"
          />
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range ? maxVal : minVal}
          onChange={range ? handleMaxChange : handleMinChange}
          onPointerDown={() => setShowMaxTooltip(true)}
          onPointerUp={() => setShowMaxTooltip(false)}
          onPointerLeave={() => setShowMaxTooltip(false)}
          disabled={disabled}
          className={clsx(thumbClasses, "z-4")}
          aria-label={range ? "Maximum value" : "Value"}
        />
        <div ref={trackRef} className="w-full relative">
          <div
            className={clsx(
              "absolute rounded-xl bg-surface-gray-2 w-full z-1",
              trackHeightClasses
            )}
          />
          <div
            ref={rangeRef}
            className={clsx(
              "absolute rounded-xl z-2",
              trackHeightClasses,
              !knob && disabled ? "bg-gray-400" : "bg-surface-gray-7"
            )}
            style={
              !range
                ? { left: "0%", width: `${getPercent(minVal)}%` }
                : undefined
            }
          />
        </div>
      </div>
      {showValue && (
        <div className="w-full mt-2 flex justify-between">
          <div className={fontSizeClasses}>{min}</div>
          <div className={fontSizeClasses}>{max}</div>
        </div>
      )}
    </div>
  );
};

export default Slider;
