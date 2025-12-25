import React, { useMemo, useRef, useCallback, forwardRef } from "react";
import { clsx } from "clsx";
import { debounce } from "../../utils/debounce";
import type { TextareaProps, TextAreaSize, TextAreaVariant } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      error,
      size = "md",
      variant = "subtle",
      disabled = false,
      value,
      onChange,
      debounce: debounceTime,
      rows = 3,
      htmlId,
      placeholder,
      className,
      style,
      ...rest
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
          (ref as { current: HTMLTextAreaElement | null }).current = node;
        }
      },
      [ref]
    );

    const sizeClasses = {
      sm: "text-sm rounded p-2",
      md: "text-base rounded p-2.5",
      lg: "text-lg rounded-md p-3",
      xl: "text-xl rounded-md p-3",
    }[size as TextAreaSize];

    const variantClasses = {
      subtle: disabled
        ? "bg-surface-gray-1 border-transparent text-ink-gray-5 placeholder-ink-gray-3"
        : "bg-surface-gray-2 border-surface-gray-2 text-ink-gray-8 placeholder-ink-gray-4 hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      outline: disabled
        ? "bg-surface-gray-1 border-outline-gray-2 text-ink-gray-5 placeholder-ink-gray-3"
        : "bg-surface-white border-outline-gray-2 text-ink-gray-8 placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
    }[variant as TextAreaVariant];

    const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "";

    const emitChange = useCallback(
      (val: string) => {
        if (onChange) {
          const syntheticEvent = {
            target: { value: val },
            currentTarget: { value: val },
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(syntheticEvent);
        }
      },
      [onChange]
    );

    const debouncedEmitChange = useMemo(() => {
      if (debounceTime) {
        return debounce((val: string) => emitChange(val), debounceTime);
      }
      return emitChange;
    }, [debounceTime, emitChange]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (debounceTime) {
        debouncedEmitChange(e.target.value);
      } else {
        onChange?.(e);
      }
    };

    return (
      <div className={clsx("w-full", className)} style={style}>
        {label && (
          <label 
            className="mb-1.5 block text-xs font-medium text-ink-gray-5" 
            htmlFor={htmlId}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={setRefs}
          id={htmlId}
          rows={rows}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            "w-full block outline-none transition-colors resize-y",
            sizeClasses,
            variantClasses,
            errorClasses
          )}
          {...rest}
        />

        {description && !error && (
          <p className="mt-1.5 text-xs text-ink-gray-4">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
