import React, {
  useMemo,
  useRef,
  useCallback,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { debounce } from "../../utils/debounce";
import { TextInputProps } from "./types";

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

    const textColor = disabled ? "text-ink-gray-5" : "text-ink-gray-8";

    const inputClasses = useMemo(() => {
      const sizeClasses = {
        sm: "text-base rounded h-7",
        md: "text-base rounded h-8",
        lg: "text-lg rounded-md h-10",
        xl: "text-xl rounded-md h-10",
      }[size];

      const paddingClasses = {
        sm: ["py-1.5", prefix ? "pl-9" : "pl-2", suffix ? "pr-8" : "pr-2"].join(
          " "
        ),
        md: [
          "py-1.5",
          prefix ? "pl-10" : "pl-2.5",
          suffix ? "pr-9" : "pr-2.5",
        ].join(" "),
        lg: [
          "py-1.5",
          prefix ? "pl-12" : "pl-3",
          suffix ? "pr-10" : "pr-3",
        ].join(" "),
        xl: [
          "py-1.5",
          prefix ? "pl-13" : "pl-3",
          suffix ? "pr-10" : "pr-3",
        ].join(" "),
      }[size];

      const currentVariant = disabled ? "disabled" : variant;
      const variantClasses = {
        subtle:
          "border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline:
          "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        disabled: `border ${
          variant === "outline" ? "border-outline-gray-2" : "border-transparent"
        } bg-surface-gray-1 placeholder-ink-gray-3`,
        ghost: 'border-0 focus:ring-0 focus-visible:ring-0',
      }[currentVariant];

      return [
        sizeClasses,
        paddingClasses,
        variantClasses,
        textColor,
        "transition-colors w-full dark:[color-scheme:dark] outline-none",
      ]
        .filter(Boolean)
        .join(" ");
    }, [size, prefix, suffix, disabled, variant, textColor]);

    const prefixClasses = useMemo(() => {
      return { sm: "pl-2", md: "pl-2.5", lg: "pl-3", xl: "pl-3" }[size];
    }, [size]);

    const suffixClasses = useMemo(() => {
      return { sm: "pr-2", md: "pr-2.5", lg: "pr-3", xl: "pr-3" }[size];
    }, [size]);

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
        className={`relative flex items-center ${rest?.className || ""}`}
        style={rest?.style}
      >
        {prefix && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center ${textColor} ${prefixClasses}`}
          >
            {prefix?.(size)}
          </div>
        )}
        <input
          ref={setRefs}
          type={type}
          disabled={disabled}
          id={rest.htmlId}
          value={inputValue}
          required={rest.required}
          onChange={handleChange}
          data-testid="text-input"
          className={`appearance-none ${inputClasses}`}
          {...rest}
        />
        {suffix && (
          <div
            className={`absolute inset-y-0 right-0 flex items-center ${textColor} ${suffixClasses}`}
          >
            {suffix && suffix()}
          </div>
        )}
      </div>
    );
  }
);

export default TextInput;
