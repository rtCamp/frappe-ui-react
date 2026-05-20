import React, { useMemo, useRef, useCallback, forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { debounce } from "../../utils/debounce";
import { cn } from "../../utils";
import type { TextInputProps, TextInputSize } from "./types";

const textInputVariants = cva(
  "w-full rounded transition-colors outline-none appearance-none placeholder:text-ink-gray-5",
  {
    variants: {
      size: {
        sm: "text-sm h-7",
        md: "text-base h-8",
        lg: "text-lg h-10",
        xl: "text-xl h-12",
      },
      variant: {
        subtle: "",
        outline: "",
      },
      state: {
        default: "",
        error: "",
        success: "",
        warning: "",
      },
      disabled: {
        true: "bg-surface-gray-2 border border-outline-gray-2 text-ink-gray-4 cursor-not-allowed",
        false: "text-ink-gray-8",
      },
    },
    compoundVariants: [
      // Subtle variant states
      {
        variant: "subtle",
        state: "default",
        disabled: false,
        class:
          "bg-surface-gray-2 border border-surface-gray-2 hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3",
      },
      {
        variant: "subtle",
        state: "error",
        disabled: false,
        class:
          "bg-surface-red-1 border border-surface-red-1 hover:bg-surface-red-2 focus:ring-2 focus:ring-outline-red-2",
      },
      {
        variant: "subtle",
        state: "success",
        disabled: false,
        class:
          "bg-surface-green-2 border border-surface-green-2 hover:bg-surface-green-1 focus:ring-2 focus:ring-outline-green-2",
      },
      {
        variant: "subtle",
        state: "warning",
        disabled: false,
        class:
          "bg-surface-amber-1 border border-surface-amber-1 hover:bg-surface-amber-2 focus:ring-2 focus:ring-outline-amber-2",
      },
      // Outline variant states
      {
        variant: "outline",
        state: "default",
        disabled: false,
        class:
          "bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3",
      },
      {
        variant: "outline",
        state: "error",
        disabled: false,
        class:
          "bg-surface-white border border-outline-red-2 hover:border-outline-red-3 focus:ring-2 focus:ring-outline-red-2",
      },
      {
        variant: "outline",
        state: "success",
        disabled: false,
        class:
          "bg-surface-white border border-outline-green-2 hover:border-outline-green-3 focus:ring-2 focus:ring-outline-green-2",
      },
      {
        variant: "outline",
        state: "warning",
        disabled: false,
        class:
          "bg-surface-white border border-outline-amber-2 hover:border-outline-amber-3 focus:ring-2 focus:ring-outline-amber-2",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "subtle",
      state: "default",
      disabled: false,
    },
  }
);

const paddingVariants = cva("py-1.5", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    hasPrefix: {
      true: "",
      false: "",
    },
    hasSuffix: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // Prefix only
    { size: "sm", hasPrefix: true, class: "pl-10" },
    { size: "md", hasPrefix: true, class: "pl-11" },
    { size: "lg", hasPrefix: true, class: "pl-12" },
    { size: "xl", hasPrefix: true, class: "pl-14" },
    { size: "sm", hasPrefix: false, class: "pl-2" },
    { size: "md", hasPrefix: false, class: "pl-2.5" },
    { size: "lg", hasPrefix: false, class: "pl-3" },
    { size: "xl", hasPrefix: false, class: "pl-3.5" },
    // Suffix only
    { size: "sm", hasSuffix: true, class: "pr-10" },
    { size: "md", hasSuffix: true, class: "pr-11" },
    { size: "lg", hasSuffix: true, class: "pr-12" },
    { size: "xl", hasSuffix: true, class: "pr-14" },
    { size: "sm", hasSuffix: false, class: "pr-2" },
    { size: "md", hasSuffix: false, class: "pr-2.5" },
    { size: "lg", hasSuffix: false, class: "pr-3" },
    { size: "xl", hasSuffix: false, class: "pr-3.5" },
  ],
  defaultVariants: {
    size: "md",
    hasPrefix: false,
    hasSuffix: false,
  },
});

const iconLeftPosVariants = cva(
  "absolute flex items-center text-ink-gray-6 pointer-events-none",
  {
    variants: {
      size: {
        sm: "left-2",
        md: "left-2.5",
        lg: "left-3",
        xl: "left-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const iconRightPosVariants = cva(
  "absolute flex items-center text-ink-gray-6 pointer-events-none",
  {
    variants: {
      size: {
        sm: "right-2",
        md: "right-2.5",
        lg: "right-3",
        xl: "right-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = "text",
      size = "md",
      variant = "subtle",
      state,
      loading = false,
      disabled = false,
      value,
      onChange,
      debounce: debounceTime,
      prefix,
      suffix,
      className,
      htmlId,
      required,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const id = htmlId || generatedId;

    const setRefs = useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as { current: HTMLInputElement | null }).current = node;
        }
      },
      [ref]
    );

    const isDisabled = disabled || loading;
    const stateKey = state ?? "default";

    const paddingClasses = paddingVariants({
      size: size as TextInputSize,
      hasPrefix: !!prefix,
      hasSuffix: !!suffix || loading,
    });

    const debouncedOnChange = useMemo(() => {
      if (!debounceTime || !onChange) return onChange;
      return debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
      }, debounceTime);
    }, [debounceTime, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (debounceTime && debouncedOnChange) {
        debouncedOnChange(e);
      } else {
        onChange?.(e);
      }
    };

    return (
      <div className={cn("w-full", className)}>
        <div className="relative flex items-center">
          {prefix && (
            <div
              className={iconLeftPosVariants({ size: size as TextInputSize })}
            >
              {prefix(size)}
            </div>
          )}

          <input
            ref={setRefs}
            id={id}
            type={type}
            disabled={isDisabled}
            required={required}
            value={value}
            onChange={handleChange}
            aria-invalid={state === "error"}
            aria-busy={loading}
            className={cn(
              textInputVariants({
                size: size as TextInputSize,
                variant,
                state: stateKey,
                disabled: isDisabled,
              }),
              paddingClasses
            )}
            {...rest}
          />

          {(suffix || loading) && (
            <div
              className={iconRightPosVariants({ size: size as TextInputSize })}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                suffix?.(size)
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
