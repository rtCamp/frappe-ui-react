/**
 * External dependencies.
 */
import { useMemo } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { RadioButtonProps } from "./types";

const RadioButton = ({
  options,
  size = "sm",
  flow = "column",
  disabled = false,
  className,
  value,
  onChange,
}: RadioButtonProps) => {
  const hasAnyLabel = useMemo(
    () => options.some((option) => option.label),
    [options]
  );

  return (
    <RadioGroup
      value={value}
      onChange={(val) => onChange?.(val)}
      disabled={disabled}
      className={clsx(
        "flex gap-1",
        flow === "row" && "flex-row",
        flow === "column" && "flex-col items-start",
        className
      )}
    >
      {options.map((option) => (
        <Field
          key={option.value}
          disabled={option.disabled || disabled}
          className={clsx(
            "group rounded transition-colors focus:outline-none",
            option.disabled || disabled
              ? "text-ink-gray-5"
              : option.label &&
                  "text-ink-gray-8 hover:bg-surface-gray-3 active:bg-surface-gray-4 focus:bg-surface-gray-2 focus:ring-2 focus:ring-outline-gray-3",
            size === "sm" && "text-base",
            size === "md" && "text-md"
          )}
        >
          <Label
            className={clsx(
              "flex items-center gap-2",
              option.label ? "px-2 py-1.75" : hasAnyLabel ? "pl-2 py-1" : "p-1"
            )}
          >
            <Radio
              value={option.value}
              className={clsx(
                "relative flex justify-center items-center shrink-0 transition-color duration-100 appearance-none border border-gray-500 rounded-full",
                "data-checked:border-gray-900 data-checked:bg-gray-900",
                !option.disabled &&
                  !disabled && [
                    "group-hover:border-gray-600 data-checked:group-hover:border-surface-gray-6 data-checked:group-hover:bg-surface-gray-6",
                    "group-active:border-gray-700 data-checked:group-active:border-surface-gray-6 data-checked:group-active:bg-surface-gray-6",
                    "group-focus:border-gray-900 focus:outline-none group-focus:ring-2 group-focus:ring-outline-gray-3",
                  ],
                "data-disabled:border-gray-200 data-disabled:bg-surface-gray-1 data-disabled:checked:border-surface-gray-2 data-disabled:checked:bg-surface-gray-2",
                size === "sm" ? "w-3.5 h-3.5" : "w-4.25 h-4.25"
              )}
            >
              <span
                className={clsx(
                  "shrink-0 absolute rounded-full pointer-events-none",
                  size === "sm" ? "w-1.5 h-1.5" : "w-1.75 h-1.75",
                  value !== option.value && "hidden",
                  option.disabled || disabled
                    ? "bg-gray-400"
                    : "bg-surface-white"
                )}
              ></span>
            </Radio>
            {option.label ? <span>{option.label}</span> : null}
          </Label>
        </Field>
      ))}
    </RadioGroup>
  );
};

export default RadioButton;
