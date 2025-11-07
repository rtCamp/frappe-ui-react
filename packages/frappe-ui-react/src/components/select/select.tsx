import React, { useMemo, useCallback } from "react";

import type { SelectProps, SelectOption } from "./types";

const Select: React.FC<SelectProps> = ({
  size = "sm",
  variant = "subtle",
  disabled = false,
  value,
  placeholder,
  options,
  onChange,
  htmlId,
  prefix,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  const selectOptions = useMemo(() => {
    return (
      options
        ?.map((option) => {
          if (typeof option === "string") {
            return {
              label: option,
              value: option,
            } as SelectOption;
          }
          return option as SelectOption;
        })
        .filter(Boolean) || []
    );
  }, [options]);

  const textColor = useMemo(() => {
    return disabled ? "text-ink-gray-4" : "text-ink-gray-8";
  }, [disabled]);

  const fontSizeClasses = useMemo(() => {
    return {
      sm: "text-base",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    }[size];
  }, [size]);

  const paddingClasses = useMemo(() => {
    return {
      sm: "pl-2 pr-5",
      md: "pl-2.5 pr-5.5",
      lg: "pl-3 pr-6",
      xl: "pl-3 pr-6",
    }[size];
  }, [size]);

  const selectClasses = useMemo(() => {
    const sizeClasses = {
      sm: "rounded h-7",
      md: "rounded h-8",
      lg: "rounded-md h-10",
      xl: "rounded-md h-10",
    }[size];

    const currentVariant = disabled ? "disabled" : variant;
    const variantClasses = {
      subtle:
        "border border-surface-gray-2 bg-surface-gray-2 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      outline:
        "border border-outline-gray-2 bg-surface-white hover:border-outline-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      ghost:
        "bg-transparent border-transparent hover:bg-surface-gray-3 focus:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      disabled: `border ${variant !== "ghost" ? "bg-surface-gray-1" : ""} ${
        variant === "outline" ? "border-outline-gray-2" : "border-transparent"
      }`,
    }[currentVariant];

    return `
      ${sizeClasses}
      ${fontSizeClasses}
      ${paddingClasses}
      ${variantClasses}
      ${textColor}
      transition-colors w-full py-0 truncate appearance-none cursor-pointer
      focus:outline-none
    `;
  }, [size, fontSizeClasses, paddingClasses, disabled, variant, textColor]);

  const prefixClasses = useMemo(() => {
    return {
      sm: "pl-2",
      md: "pl-2.5",
      lg: "pl-3",
      xl: "pl-3",
    }[size];
  }, [size]);
  
  return (
    <div className="relative flex items-center">
      {prefix && (
        <div
          className={`absolute inset-y-0 left-0 flex items-center ${textColor} ${prefixClasses} pointer-events-none`}
        >
          {typeof prefix === "function" ? prefix() : prefix}
        </div>
      )}
      {placeholder && !value && (
        <div
          className={`pointer-events-none absolute text-ink-gray-4 truncate w-full ${fontSizeClasses} ${paddingClasses}`}
        >
          {placeholder}
        </div>
      )}
      <select
        className={selectClasses}
        disabled={disabled}
        id={htmlId}
        value={value}
        onChange={handleChange}
        data-testid="select"
      >
        {placeholder && !value && <option />}
        {selectOptions.map((option) => (
          <option
            selected={option.value === value}
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
