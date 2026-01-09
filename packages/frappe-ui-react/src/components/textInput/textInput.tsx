import React, {
  useMemo,
  useRef,
  useCallback,
  forwardRef,
  useId,
} from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import { debounce } from "../../utils/debounce";
import type { TextInputProps, TextInputSize } from "./types";

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
      style,
      htmlId,
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

    const sizeClasses = {
      sm: "text-sm h-7",
      md: "text-base h-8",
      lg: "text-lg h-10",
      xl: "text-xl h-12",
    }[size as TextInputSize];

    const iconLeftPosClasses = {
      sm: "left-2",
      md: "left-2.5",
      lg: "left-3",
      xl: "left-3.5",
    }[size as TextInputSize];

    const iconRightPosClasses = {
      sm: "right-2",
      md: "right-2.5",
      lg: "right-3",
      xl: "right-3.5",
    }[size as TextInputSize];

    const paddingClasses = clsx(
      "py-1.5",
      prefix
        ? { sm: "pl-10", md: "pl-11", lg: "pl-12", xl: "pl-14" }[size as TextInputSize]
        : { sm: "pl-2", md: "pl-2.5", lg: "pl-3", xl: "pl-3.5" }[size as TextInputSize],
      suffix || loading
        ? { sm: "pr-10", md: "pr-11", lg: "pr-12", xl: "pr-14" }[size as TextInputSize]
        : { sm: "pr-2", md: "pr-2.5", lg: "pr-3", xl: "pr-3.5" }[size as TextInputSize]
    );

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

    const disabledClass =
      "bg-surface-gray-2 border border-outline-gray-2 text-ink-gray-4 cursor-not-allowed";

    const variantMap = {
      subtle: subtleClasses,
      outline: outlineClasses,
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

    return (
      <div className={clsx("w-full", className)} style={style}>
        <div className="relative flex items-center">
          {prefix && (
            <div
              className={clsx(
                "absolute flex items-center text-ink-gray-6 pointer-events-none",
                iconLeftPosClasses
              )}
            >
              {prefix(size)}
            </div>
          )}

          <input
            ref={setRefs}
            id={id}
            type={type}
            disabled={isDisabled}
            value={value}
            onChange={handleChange}
            className={clsx(
              "w-full rounded transition-colors outline-none appearance-none placeholder:text-ink-gray-5",
              sizeClasses,
              paddingClasses,
              currentVariantClasses,
              !isDisabled && "text-ink-gray-8"
            )}
            {...rest}
          />

          {(suffix || loading) && (
            <div
              className={clsx(
                "absolute flex items-center text-ink-gray-6 pointer-events-none",
                iconRightPosClasses
              )}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : suffix?.(size)}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
