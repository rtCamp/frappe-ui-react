import React, { useMemo, useRef, useCallback, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { debounce } from "../../utils/debounce";
import type { TextareaProps, TextareaSize } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
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
      required,
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
    }[size as TextareaSize];

    const subtleClasses = {
      default:
        "bg-surface-gray-2 border border-surface-gray-2 hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3",
      error:
        "bg-surface-red-1 border border-surface-red-1 hover:bg-surface-red-2 focus:ring-2 focus:ring-outline-red-2",
      success:
        "bg-surface-green-2 border border-surface-green-2 hover:bg-surface-green-1 focus:ring-2 focus:ring-outline-green-2",
      warning:
        "bg-surface-amber-1 border border-surface-amber-1 hover:bg-surface-amber-2 focus:ring-2 focus:ring-outline-amber-2",
    };

    const outlineClasses = {
      default:
        "bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3",
      error:
        "bg-surface-white border border-outline-red-2 hover:border-outline-red-3 focus:ring-2 focus:ring-outline-red-2",
      success:
        "bg-surface-white border border-outline-green-2 hover:border-outline-green-3 focus:ring-2 focus:ring-outline-green-2",
      warning:
        "bg-surface-white border border-outline-amber-2 hover:border-outline-amber-3 focus:ring-2 focus:ring-outline-amber-2",
    };

    const ghostClasses = {
      default:
        "hover:bg-surface-gray-3 focus:ring-2 focus:ring-outline-gray-3",
      error:
        "hover:bg-surface-red-2 focus:ring-2 focus:ring-outline-red-2",
      success:
        "hover:bg-surface-green-1 focus:ring-2 focus:ring-outline-green-2",
      warning:
        "hover:bg-surface-amber-2 focus:ring-2 focus:ring-outline-amber-2",
    };

    const underlineClasses = {
      default:
        "bg-transparent border-b border-outline-gray-2 rounded-none px-0 hover:border-outline-gray-3 focus:ring-0 focus:border-outline-gray-3",
      error:
        "bg-transparent border-b border-outline-red-2 rounded-none px-0 hover:border-outline-red-3 focus:ring-0 focus:border-outline-red-3",
      success:
        "bg-transparent border-b border-outline-green-2 rounded-none px-0 hover:border-outline-green-3 focus:ring-0 focus:border-outline-green-3",
      warning:
        "bg-transparent border-b border-outline-amber-2 rounded-none px-0 hover:border-outline-amber-3 focus:ring-0 focus:border-outline-amber-3",
    };

    const disabledClass =
      "bg-surface-gray-2 border border-outline-gray-2 text-ink-gray-4 cursor-not-allowed resize-none";

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
        <textarea
          ref={setRefs}
          id={id}
          rows={rows}
          disabled={isDisabled}
          required={required}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            "w-full block outline-none appearance-none transition-colors resize-none placeholder:text-ink-gray-5 relative z-0",
            sizeClasses,
            currentVariantClasses,
            !isDisabled && "text-ink-gray-8"
          )}
          {...rest}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
