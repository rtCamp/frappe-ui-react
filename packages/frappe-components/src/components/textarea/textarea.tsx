import React, { useRef, useCallback, useMemo } from "react";
import { debounce } from "../../utils";
import type { TextareaProps } from "./types";

export const Textarea: React.FC<TextareaProps> = ({
  size = "sm",
  variant = "subtle",
  placeholder,
  disabled,
  id,
  value,
  debounce: debounceMs,
  rows = 3,
  label,
  onChange,
  className = "",
  ...attrs
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Label classes
  const labelClasses = useMemo(() => {
    const sizeMap = {
      sm: "text-xs",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };
    return [sizeMap[size], "text-ink-gray-5"].join(" ");
  }, [size]);

  // Input classes
  const inputClasses = useMemo(() => {
    const sizeClasses = {
      sm: "text-base rounded",
      md: "text-base rounded",
      lg: "text-lg rounded-md",
      xl: "text-xl rounded-md",
    }[size];

    const paddingClasses = {
      sm: "py-1.5 px-2",
      md: "py-1.5 px-2.5",
      lg: "py-1.5 px-3",
      xl: "py-1.5 px-3",
    }[size];

    const variantKey = disabled ? "disabled" : variant;
    const variantClasses = {
      subtle:
        "border border-[--surface-gray-2] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      outline:
        "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      disabled: [
        "border bg-surface-gray-1 placeholder-ink-gray-3",
        variant === "outline" ? "border-outline-gray-2" : "border-transparent",
      ].join(" "),
    }[variantKey];

    return [
      sizeClasses,
      paddingClasses,
      variantClasses,
      disabled ? "text-ink-gray-5" : "text-ink-gray-8",
      "transition-colors w-full block outline-none focus:outline-none",
      className,
    ].join(" ");
  }, [size, variant, disabled, className]);

  // Debounced or direct change callback
  const emitChange = useMemo(() => {
    if (debounceMs && onChange) {
      return debounce(onChange, debounceMs);
    }
    return onChange;
  }, [debounceMs, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      emitChange?.(e.target.value);
    },
    [emitChange]
  );

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        className={inputClasses}
        disabled={disabled}
        id={id}
        value={value}
        rows={rows}
        onChange={handleChange}
        {...attrs}
      />
    </div>
  );
};
