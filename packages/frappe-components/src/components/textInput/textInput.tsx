import React, { useRef, useMemo, useCallback } from "react";
import { debounce } from "../../utils";
import type { TextInputProps } from "./types";

export const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  size = "sm",
  variant = "subtle",
  placeholder,
  disabled,
  id,
  value,
  debounce: debounceMs,
  required,
  className,
  style,
  prefix,
  suffix,
  onChange,
  ...attrs
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Classes
  const textColor = disabled ? "text-ink-gray-5" : "text-ink-gray-8";
  const sizeMap = {
    sm: {
      text: "text-base rounded h-7",
      prefix: "pl-8",
      suffix: "pr-8",
      noPrefix: "pl-2",
      noSuffix: "pr-2",
    },
    md: {
      text: "text-base rounded h-8",
      prefix: "pl-9",
      suffix: "pr-9",
      noPrefix: "pl-2.5",
      noSuffix: "pr-2.5",
    },
    lg: {
      text: "text-lg rounded-md h-10",
      prefix: "pl-10",
      suffix: "pr-10",
      noPrefix: "pl-3",
      noSuffix: "pr-3",
    },
    xl: {
      text: "text-xl rounded-md h-10",
      prefix: "pl-10",
      suffix: "pr-10",
      noPrefix: "pl-3",
      noSuffix: "pr-3",
    },
  }[size];
  const paddingClasses = [
    "py-1.5",
    prefix ? sizeMap.prefix : sizeMap.noPrefix,
    suffix ? sizeMap.suffix : sizeMap.noSuffix,
  ].join(" ");

  const variantKey = disabled ? "disabled" : variant;
  const variantClasses = {
    subtle:
      "border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
    outline:
      "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
    disabled: [
      "border bg-surface-gray-1 placeholder-ink-gray-3",
      variant === "outline" ? "border-outline-gray-2" : "border-transparent",
    ].join(" "),
  }[variantKey];

  const inputClasses = [
    sizeMap.text,
    paddingClasses,
    variantClasses,
    textColor,
    "transition-colors block w-full outline-none focus:outline-none",
    className || "",
  ].join(" ");

  // Debounced or direct change callback
  const emitChange = useMemo(() => {
    if (debounceMs && onChange) {
      return debounce(onChange, debounceMs);
    }
    return onChange;
  }, [debounceMs, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      emitChange?.(e.target.value);
    },
    [emitChange]
  );

  return (
    <div
      className={`relative flex items-center w-full ${className || ""}`}
      style={style}
    >
      {prefix && (
        <div
          className={`absolute inset-y-0 left-0 pl-2 flex items-center ${textColor}`}
        >
          {prefix}
        </div>
      )}
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        disabled={disabled}
        id={id}
        value={value}
        required={required}
        onChange={handleChange}
        {...attrs}
      />
      {suffix && (
        <div
          className={`absolute inset-y-0 right-0 pr-2 flex items-center ${textColor}`}
        >
          {suffix}
        </div>
      )}
    </div>
  );
};
