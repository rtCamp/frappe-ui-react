import React, { useMemo, useRef, useCallback, forwardRef } from "react";

import { debounce } from "../../utils/debounce";
import { TextareaProps } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      size = "sm",
      variant = "subtle",
      disabled = false,
      value,
      onChange,
      debounce: debounceTime,
      rows = 3,
      htmlId,
      placeholder,
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setRefs = useCallback(
      (node: HTMLTextAreaElement) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

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

      const currentVariant = disabled ? "disabled" : variant;
      const variantClasses = {
        subtle:
          "border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline:
          "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        disabled: `border bg-surface-gray-1 placeholder-ink-gray-3 ${
          variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        }`,
      }[currentVariant];

      const textColor = disabled ? "text-ink-gray-5" : "text-ink-gray-8";

      return `resize-y transition-colors w-full block outline-none ${sizeClasses} ${paddingClasses} ${variantClasses} ${textColor}`;
    }, [size, disabled, variant]);

    const labelClasses = useMemo(() => {
      const sizeClasses = {
        sm: "text-xs",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      }[size];
      return `block ${sizeClasses} text-ink-gray-5`;
    }, [size]);

    const emitChange = useCallback(
      (value: string) => {
        if (onChange) {
          const syntheticEvent = {
            target: { value },
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(syntheticEvent);
        }
      },
      [onChange]
    );

    const debouncedEmitChange = useMemo(() => {
      if (debounceTime) {
        return debounce((value: string) => emitChange(value), debounceTime);
      }
      return emitChange;
    }, [debounceTime, emitChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        debouncedEmitChange(e.target.value);
      },
      [debouncedEmitChange]
    );

    return (
      <div className="space-y-1.5">
        {label && (
          <label className={labelClasses} htmlFor={htmlId}>
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          rows={rows}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          id={htmlId}
          value={value}
          onChange={handleChange}
          data-testid="textarea"
        />
      </div>
    );
  }
);

export default Textarea;
