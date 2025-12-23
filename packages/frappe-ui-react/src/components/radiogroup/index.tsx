import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import type { RadioGroupProps, RadioGroupSize, RadioGroupTheme } from "./types";

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  theme = "gray",
  variant = "default",
  disabled = false,
  className = "",
  name,
  orientation = "vertical",
}) => {
  const sizeClasses: Record<RadioGroupSize, string> = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const indicatorSizeClasses: Record<RadioGroupSize, string> = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
  };

  const labelSizeClasses: Record<RadioGroupSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const themeClasses: Record<RadioGroupTheme, string> = {
    gray: "border-outline-gray-4 data-[state=checked]:border-outline-gray-5 data-[state=checked]:bg-surface-gray-7",
    blue: "border-outline-blue-1 data-[state=checked]:border-surface-blue-3 data-[state=checked]:bg-surface-blue-3",
    green:
      "border-outline-green-2 data-[state=checked]:border-surface-green-3 data-[state=checked]:bg-surface-green-3",
    red: "border-outline-red-2 data-[state=checked]:border-surface-red-5 data-[state=checked]:bg-surface-red-5",
  };

  const variantClasses = {
    default: "",
    card: "border border-outline-gray-2 rounded p-3 hover:bg-surface-gray-2 transition-colors cursor-pointer",
  };

  const orientationClasses =
    orientation === "horizontal"
      ? "flex flex-row gap-4"
      : "flex flex-col gap-3";

  const handleValueChange = (newValue: string) => {
    onChange?.(newValue);
  };

  return (
    <RadioGroupPrimitive.Root
      className={`${orientationClasses} ${className}`}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      name={name}
    >
      {options.map((option) => {
        const isDisabled = disabled || option.disabled;
        const itemId = `radio-${name || "group"}-${option.value}`;

        return (
          <div
            key={option.value}
            className={`flex items-start ${
              variant === "card" ? variantClasses.card : ""
            }`}
          >
            <RadioGroupPrimitive.Item
              value={option.value}
              id={itemId}
              disabled={isDisabled}
              className={`
                ${sizeClasses[size]}
                ${themeClasses[theme]}
                rounded-full border-2 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3
                disabled:cursor-not-allowed disabled:opacity-50
                transition-colors
                flex-shrink-0
                mt-0.5
              `}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative">
                <Circle
                  className={`${indicatorSizeClasses[size]} fill-white text-white`}
                />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>

            <label
              htmlFor={itemId}
              className={`
                ml-2 cursor-pointer select-none
                ${labelSizeClasses[size]}
                ${
                  isDisabled
                    ? "text-ink-gray-4 cursor-not-allowed opacity-50"
                    : "text-ink-gray-8"
                }
              `}
            >
              <div className="font-medium">{option.label}</div>
              {option.description && (
                <div
                  className={`${
                    size === "sm" ? "text-xs" : "text-sm"
                  } text-ink-gray-5 mt-0.5`}
                >
                  {option.description}
                </div>
              )}
            </label>
          </div>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
};

export default RadioGroup;
