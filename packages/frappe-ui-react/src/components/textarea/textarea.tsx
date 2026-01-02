import React, { useMemo, useRef, useCallback, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { debounce } from "../../utils/debounce";
import type { TextareaProps, TextAreaSize } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      error,
      size = "md",
      variant = "subtle",
      state,
      loading = false,
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
    const generatedId = useId();
    const id = htmlId || generatedId;

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

    const isDisabled = disabled || loading;
    const stateKey = state ?? "default";

    const sizeClasses = {
      sm: "text-sm rounded p-2",
      md: "text-base rounded p-2.5",
      lg: "text-lg rounded-md p-3",
    }[size as TextAreaSize];

    const subtleClasses = {
      
      default: "bg-gray-100 text-gray-900 border border-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-outline-gray-3 dark:bg-[var(--surface-white,rgba(15,15,15,1))] dark:text-[var(--text-icons-gray-8,rgba(212,212,212,1))] dark:border-gray-800 dark:hover:bg-gray-700",
      error: "bg-red-50 text-red-800 border border-red-50 hover:bg-red-100 focus:ring-2 focus:ring-red-200 dark:bg-red-500/10 dark:border-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20",
      success: "bg-green-50 text-green-800 border border-green-50 hover:bg-green-100 focus:ring-2 focus:ring-green-200 dark:bg-green-500/10 dark:border-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20",
      warning: "bg-orange-50 text-orange-800 border border-orange-50 hover:bg-orange-100 focus:ring-2 focus:ring-orange-200 dark:bg-orange-500/10 dark:border-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20",
    };

    const outlineClasses = {
      
      default: "bg-white text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-outline-gray-3 dark:bg-[var(--surface-gray-1,rgba(35,35,35,1))] dark:text-[var(--text-icons-gray-5,rgba(128,128,128,1))] dark:border-gray-700 dark:hover:border-gray-600",
      error: "bg-white text-red-800 border border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200 dark:bg-gray-900 dark:text-red-400 dark:border-red-500",
      success: "bg-white text-green-800 border border-green-500 hover:border-green-600 focus:ring-2 focus:ring-green-200 dark:bg-gray-900 dark:text-green-400 dark:border-green-500",
      warning: "bg-white text-orange-800 border border-orange-500 hover:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:bg-gray-900 dark:text-orange-400 dark:border-orange-500",
    };

    const ghostClasses = {
      default: "text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-outline-gray-3 dark:text-white dark:hover:bg-gray-800",
      error: "text-red-800 hover:bg-red-50 focus:ring-2 focus:ring-red-200 dark:text-red-400 dark:hover:bg-red-500/10",
      success: "text-green-800 hover:bg-green-50 focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-500/10",
      warning: "text-orange-800 hover:bg-orange-50 focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-500/10",
    };

    const underlineClasses = {
      default: "bg-transparent border-b border-gray-300 text-gray-900 rounded-none px-0 hover:border-gray-400 focus:ring-0 focus:border-gray-900 dark:text-white dark:border-gray-700 dark:hover:border-gray-500",
      error: "bg-transparent border-b border-red-500 text-red-800 rounded-none px-0 hover:border-red-600 focus:ring-0 focus:border-red-600 dark:text-red-400 dark:border-red-500",
      success: "bg-transparent border-b border-green-500 text-green-800 rounded-none px-0 hover:border-green-600 focus:ring-0 focus:border-green-600 dark:text-green-400 dark:border-green-500",
      warning: "bg-transparent border-b border-orange-500 text-orange-800 rounded-none px-0 hover:border-orange-600 focus:ring-0 focus:border-orange-600 dark:text-orange-400 dark:border-orange-500",
    };

    const disabledClass = "bg-gray-100 border border-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-800 dark:text-gray-500 resize-none";

    const variantMap = {
      subtle: subtleClasses,
      outline: outlineClasses,
      ghost: ghostClasses,
      underline: underlineClasses,
    };

    const currentVariantClasses = isDisabled
      ? disabledClass
      : variantMap[variant][stateKey];


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
            className="mb-1.5 block text-xs font-medium text-gray-900 dark:text-white" 
            htmlFor={id}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={setRefs}
          id={id}
          rows={rows}
          disabled={isDisabled}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            "w-full block outline-none appearance-none transition-colors resize-none placeholder:text-gray-800 dark:placeholder:text-gray-500 relative z-0",
            sizeClasses,
            currentVariantClasses
          )}
          {...rest}
        />

        {description && !error && (
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;


