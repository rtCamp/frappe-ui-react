import React, {
  useMemo,
  useRef,
  useCallback,
  type InputHTMLAttributes,
  forwardRef,
} from "react";
import { cva } from "class-variance-authority";
import { debounce } from "../../utils/debounce";
import { cn } from "../../utils";
import type { TextInputProps } from "./types";

const inputVariants = cva(
  "transition-colors w-full dark:[color-scheme:dark] outline-none appearance-none",
  {
    variants: {
      size: {
        sm: "text-base rounded h-7",
        md: "text-base rounded h-8",
        lg: "text-lg rounded-md h-10",
        xl: "text-xl rounded-md h-10",
      },
      variant: {
        subtle:
          "border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline:
          "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        ghost: "border-0 focus:ring-0 focus-visible:ring-0",
      },
      disabled: {
        true: "",
        false: "",
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
      // disabled
      // sm padding
      { size: "sm", hasPrefix: false, className: "pl-2" },
      { size: "sm", hasPrefix: true, className: "pl-9" },
      { size: "sm", hasSuffix: false, className: "pr-2 py-1.5" },
      { size: "sm", hasSuffix: true, className: "pr-8 py-1.5" },
      // md padding
      { size: "md", hasPrefix: false, className: "pl-2.5" },
      { size: "md", hasPrefix: true, className: "pl-10" },
      { size: "md", hasSuffix: false, className: "pr-2.5 py-1.5" },
      { size: "md", hasSuffix: true, className: "pr-9 py-1.5" },
      // lg padding
      { size: "lg", hasPrefix: false, className: "pl-3" },
      { size: "lg", hasPrefix: true, className: "pl-12" },
      { size: "lg", hasSuffix: false, className: "pr-3 py-1.5" },
      { size: "lg", hasSuffix: true, className: "pr-10 py-1.5" },
      // xl padding
      { size: "xl", hasPrefix: false, className: "pl-3" },
      { size: "xl", hasPrefix: true, className: "pl-13" },
      { size: "xl", hasSuffix: false, className: "pr-3 py-1.5" },
      { size: "xl", hasSuffix: true, className: "pr-10 py-1.5" },
      // disabled compound variants
      {
        disabled: true,
        variant: "outline",
        className:
          "border border-outline-gray-2 bg-surface-gray-1 placeholder-ink-gray-3 pointer-events-none",
      },
      {
        disabled: true,
        variant: "subtle",
        className:
          "border border-transparent bg-surface-gray-1 placeholder-ink-gray-3 pointer-events-none",
      },
      {
        disabled: true,
        variant: "ghost",
        className:
          "border border-transparent bg-surface-gray-1 placeholder-ink-gray-3 pointer-events-none",
      },
    ],
    defaultVariants: {
      size: "sm",
      variant: "subtle",
      disabled: false,
      hasPrefix: false,
      hasSuffix: false,
    },
  }
);

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = "text",
      size = "sm",
      variant = "subtle",
      disabled = false,
      value,
      onChange,
      debounce: debounceTime,
      prefix,
      suffix,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

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

    const emitChange = useCallback(
      (value: string) => {
        if (onChange) {
          const syntheticEvent = {
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>;
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
      (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedEmitChange(e.target.value);
      },
      [debouncedEmitChange]
    );

    const inputValue =
      value ?? (rest as InputHTMLAttributes<HTMLInputElement>).value;

    return (
      <div
        className={cn("relative flex items-center", rest.className)}
        style={rest?.style}
      >
        {prefix && (
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex items-center text-ink-gray-8",
              {
                "text-ink-gray-5": disabled,
                "pl-2": size === "sm",
                "pl-2.5": size === "md",
                "pl-3": size === "lg" || size === "xl",
              }
            )}
          >
            {prefix?.(size)}
          </div>
        )}
        <input
          {...rest}
          ref={setRefs}
          type={type}
          disabled={disabled}
          id={rest.htmlId}
          value={inputValue}
          required={rest.required}
          onChange={handleChange}
          data-testid="text-input"
          className={inputVariants({
            size,
            variant,
            disabled,
            hasPrefix: !!prefix,
            hasSuffix: !!suffix,
          })}
        />
        {suffix && (
          <div
            className={cn("absolute inset-y-0 right-0 flex items-center", {
              "text-ink-gray-5": disabled,
              "pr-2": size === "sm",
              "pr-2.5": size === "md",
              "pr-3": size === "lg" || size === "xl",
            })}
          >
            {suffix && suffix()}
          </div>
        )}
      </div>
    );
  }
);

export default TextInput;
