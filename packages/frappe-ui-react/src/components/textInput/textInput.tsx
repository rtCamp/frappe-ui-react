import React, {
  useMemo,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { clsx } from "clsx";
import { debounce } from "../../utils/debounce";
import type { TextInputProps } from "./types";

// 1. Define valid keys for casting
type SizeKey = "sm" | "md" | "lg" | "xl";
type VariantKey = "subtle" | "outline" | "ghost";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = "text",
      size = "md",
      variant = "subtle",
      disabled = false,
      value,
      onChange,
      debounce: debounceTime,
      prefix,
      suffix,
      label,
      description,
      error,
      className,
      style,
      htmlId,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle Ref Merging
    const setRefs = useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // --- Styles ---
    // Fix 1: Cast 'size' to SizeKey
    const sizeClasses = {
      sm: "text-sm h-7",
      md: "text-base h-8",
      lg: "text-lg h-10",
      xl: "text-xl h-10",
    }[size as SizeKey];

    const paddingClasses = clsx(
      "py-1.5",
      prefix 
        ? { sm: "pl-8", md: "pl-9", lg: "pl-11", xl: "pl-12" }[size as SizeKey] 
        : { sm: "pl-2", md: "pl-2.5", lg: "pl-3", xl: "pl-3" }[size as SizeKey],
      suffix 
        ? { sm: "pr-8", md: "pr-9", lg: "pr-11", xl: "pr-12" }[size as SizeKey] 
        : { sm: "pr-2", md: "pr-2.5", lg: "pr-3", xl: "pr-3" }[size as SizeKey]
    );

    // Fix 2: Cast 'variant' to VariantKey here!
    const variantClasses = {
      subtle: disabled
        ? "bg-surface-gray-1 border-transparent text-ink-gray-5 placeholder-ink-gray-3"
        : "bg-surface-gray-2 border-surface-gray-2 text-ink-gray-8 placeholder-ink-gray-4 hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3",
      outline: disabled
        ? "bg-surface-gray-1 border-outline-gray-2 text-ink-gray-5 placeholder-ink-gray-3"
        : "bg-surface-white border-outline-gray-2 text-ink-gray-8 placeholder-ink-gray-4 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3",
      ghost: "border-0 bg-transparent focus:ring-0",
    }[variant as VariantKey];

    const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "";

    // --- Logic ---
    const emitChange = useCallback(
      (val: string) => {
        if (onChange) {
          const syntheticEvent = {
            target: { value: val },
            currentTarget: { value: val },
          } as React.ChangeEvent<HTMLInputElement>;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (debounceTime) {
        debouncedEmitChange(e.target.value);
      } else {
        onChange?.(e);
      }
    };

    // Fix 3: Cast 'size' here too
    const iconPos = { sm: "2", md: "2.5", lg: "3", xl: "3" }[size as SizeKey];

    return (
      <div className={clsx("w-full", className)} style={style}>
        {label && (
          <label className="mb-1.5 block text-xs font-medium text-ink-gray-5" htmlFor={htmlId}>
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {prefix && (
            <div className={`absolute left-${iconPos} flex items-center text-ink-gray-5 pointer-events-none`}>
              {typeof prefix === 'function' ? prefix(size) : prefix}
            </div>
          )}
          
          <input
            ref={setRefs}
            id={htmlId}
            type={type}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            required={rest.required}
            className={clsx(
              "w-full rounded transition-colors outline-none",
              sizeClasses,
              paddingClasses,
              variantClasses,
              errorClasses
            )}
            {...rest}
          />

          {suffix && (
            <div className={`absolute right-${iconPos} flex items-center text-ink-gray-5 pointer-events-none`}>
               {typeof suffix === 'function' ? suffix(size) : suffix}
            </div>
          )}
        </div>

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

TextInput.displayName = "TextInput";
export default TextInput;