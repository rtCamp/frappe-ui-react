/**
 * External dependencies.
 */
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { RadioButtonProps } from "./types";

const RadioButton = ({
  options,
  size = "sm",
  flow = "row",
  className,
  value,
  onChange,
}: RadioButtonProps) => {
  return (
    <div
      className={clsx(
        "flex gap-2.5 items-center",
        flow === "row" ? "flex-row" : "flex-col",
        className
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            "rounded flex justify-center items-center gap-2 transition-colors focus:outline-none",
            option.disabled
              ? "text-ink-gray-5"
              : option.label &&
                  "px-2 py-1.75 text-ink-gray-8 hover:bg-surface-gray-3 active:bg-surface-gray-4 focus:bg-surface-gray-2 focus:ring-2 focus:ring-outline-gray-3",
            size === "sm" && "text-base",
            size === "md" && "text-md"
          )}
        >
          <div className="relative flex justify-center items-center">
            <input
              type="radio"
              name="radio-group"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              disabled={option.disabled}
              className={clsx(
                "transition-color duration-100 appearance-none border border-gray-500 rounded-full checked:border-gray-900 checked:bg-gray-900 hover:border-gray-600 checked:hover:border-surface-gray-6 checked:hover:bg-surface-gray-6 active:border-gray-700 checked:active:border-surface-gray-6 checked:active:bg-surface-gray-6 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-outline-gray-3 disabled:border-gray-200 disabled:bg-surface-gray-1 disabled:checked:border-surface-gray-2 disabled:checked:bg-surface-gray-2",
                size === "sm" ? "w-3.5 h-3.5" : "w-4.25 h-4.25"
              )}
            />
            <span
              className={clsx(
                "absolute rounded-full pointer-events-none",
                size === "sm" ? "w-1.5 h-1.5" : "w-1.75 h-1.75",
                value !== option.value && "hidden",
                option.disabled ? "bg-gray-400" : "bg-surface-white"
              )}
            ></span>
          </div>
          {option.label ? <span>{option.label}</span> : null}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
