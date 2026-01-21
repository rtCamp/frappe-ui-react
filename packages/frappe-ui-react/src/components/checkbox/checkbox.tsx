import React, { useMemo, useCallback } from "react";
import type { CheckboxProps } from "./types";
import type { SizeTypes } from "../../common/types";

const Checkbox: React.FC<CheckboxProps> = ({
  size = "sm",
  label,
  disabled = false,
  padding = false,
  value,
  onChange,
  htmlId,
  extraClasses = "",
}) => {
  const labelClasses = useMemo(() => {
    const sizeClasses: string = {
      sm: "text-base font-medium",
      md: "text-lg font-medium",
    }[size as keyof SizeTypes];

    const colorClasses = disabled ? "text-ink-gray-4" : "text-ink-gray-8";
    return `${sizeClasses} ${colorClasses} select-none`;
  }, [size, disabled]);

  const inputClasses = useMemo(() => {
    const baseClasses = disabled
      ? "border-outline-gray-2 bg-surface-menu-bar text-ink-gray-3"
      : "border-outline-gray-4 text-ink-gray-9 hover:border-gray-600 focus:ring-offset-0 focus:border-gray-900 active:border-gray-700 transition accent-black dark:accent-white";

    const interactionClasses = disabled
      ? ""
      : padding
        ? "focus:ring-0"
        : "hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:bg-surface-gray-2";

    const sizeClasses: string = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
    }[size as keyof SizeTypes];

    return `rounded-sm mt-[1px] ${extraClasses} ${baseClasses} ${interactionClasses} ${sizeClasses}`;
  }, [disabled, padding, size, extraClasses]);

  const wrapperClasses = useMemo(() => {
    let paddingClasses = "";
    if (padding && size === "sm") {
      paddingClasses = "px-2.5 py-1.5";
    }

    if (padding && size === "md") {
      paddingClasses = "px-3 py-2";
    }

    const interactionClasses =
      padding && !disabled
        ? "focus-within:bg-surface-gray-2 focus-within:ring-2 focus-within:ring-outline-gray-3 hover:bg-surface-gray-3 active:bg-surface-gray-4"
        : "";

    return `inline-flex space-x-2 rounded transition ${paddingClasses} ${interactionClasses}`;
  }, [padding, size, disabled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );

  return (
    <div className={wrapperClasses}>
      <input
        className={inputClasses}
        type="checkbox"
        disabled={disabled}
        id={htmlId}
        checked={Boolean(value)}
        onChange={handleChange}
        data-testid="checkbox"
      />
      {label && (
        <label className={labelClasses} htmlFor={htmlId}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
