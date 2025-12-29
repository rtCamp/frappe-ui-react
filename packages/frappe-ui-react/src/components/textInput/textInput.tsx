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
import type { TextInputProps, SizeKey, VariantKey } from "./types";

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

    // --- Styles ---
    const sizeClasses = {
      sm: "text-sm h-7",
      md: "text-base h-8",
      lg: "text-lg h-10",
    }[size as SizeKey];

    const paddingClasses = clsx(
      "py-1.5",
      prefix 
        ? { sm: "pl-10", md: "pl-11", lg: "pl-12" }[size as SizeKey] 
        : { sm: "pl-2", md: "pl-2.5", lg: "pl-3" }[size as SizeKey],
      (suffix || loading) 
        ? { sm: "pr-10", md: "pr-11", lg: "pr-12" }[size as SizeKey] 
        : { sm: "pr-2", md: "pr-2.5", lg: "pr-3" }[size as SizeKey]
    );

    const getVariantClasses = () => {
      if (isDisabled) {
        return "bg-gray-100 border border-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-800 dark:text-gray-500";
      }

      if (variant === "subtle") {
        switch (state) {
          case "error":
            return "bg-red-50 text-red-700 border border-red-50 hover:bg-red-100 focus:bg-white focus:ring-2 focus:ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/10 dark:hover:bg-red-500/20";
          case "success":
            return "bg-green-50 text-green-700 border border-green-50 hover:bg-green-100 focus:bg-white focus:ring-2 focus:ring-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/10 dark:hover:bg-green-500/20";
          case "warning":
            return "bg-orange-50 text-orange-700 border border-orange-50 hover:bg-orange-100 focus:bg-white focus:ring-2 focus:ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/10 dark:hover:bg-orange-500/20";
          default:
            return "bg-gray-100 text-gray-900 border border-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-outline-gray-3 dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:hover:bg-gray-700";
        }
      }

      if (variant === "outline") {
        switch (state) {
          case "error":
            return "bg-white text-red-700 border border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200 dark:bg-gray-900 dark:text-red-400 dark:border-red-500";
          case "success":
            return "bg-white text-green-700 border border-green-500 hover:border-green-600 focus:ring-2 focus:ring-green-200 dark:bg-gray-900 dark:text-green-400 dark:border-green-500";
          case "warning":
            return "bg-white text-orange-700 border border-orange-500 hover:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:bg-gray-900 dark:text-orange-400 dark:border-orange-500";
          default:
            return "bg-white text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-outline-gray-3 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:border-gray-600";
        }
      }

      if (variant === "ghost") {
        switch (state) {
          case "error":
            return "text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-200 dark:text-red-400 dark:hover:bg-red-500/10";
          case "success":
            return "text-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-500/10";
          case "warning":
            return "text-orange-700 hover:bg-orange-50 focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-500/10";
          default:
            return "text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-outline-gray-3 dark:text-white dark:hover:bg-gray-800";
        }
      }

      if (variant === "underline") {
        switch (state) {
          case "error":
            return "bg-transparent border-b border-red-500 text-red-700 rounded-none px-0 hover:border-red-600 focus:ring-0 focus:border-red-600 dark:text-red-400 dark:border-red-500";
          case "success":
            return "bg-transparent border-b border-green-500 text-green-700 rounded-none px-0 hover:border-green-600 focus:ring-0 focus:border-green-600 dark:text-green-400 dark:border-green-500";
          case "warning":
            return "bg-transparent border-b border-orange-500 text-orange-700 rounded-none px-0 hover:border-orange-600 focus:ring-0 focus:border-orange-600 dark:text-orange-400 dark:border-orange-500";
          default:
            return "bg-transparent border-b border-gray-300 text-gray-900 rounded-none px-0 hover:border-gray-400 focus:ring-0 focus:border-gray-900 dark:text-white dark:border-gray-700 dark:hover:border-gray-500";
        }
      }

      return "";
    };

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

    const iconPos = { sm: "2", md: "2.5", lg: "3" }[size as SizeKey];

    return (
      <div className={clsx("w-full", className)} style={style}>
        {label && (
          <label className="mb-1.5 block text-xs font-medium text-gray-900 dark:text-white" htmlFor={id}>
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {prefix && (
            <div className={`absolute left-${iconPos} flex items-center text-gray-700 dark:text-gray-400 pointer-events-none`}>
              {prefix}
            </div>
          )}
          
          <input
            ref={setRefs}
            id={id}
            type={type}
            disabled={isDisabled}
            value={value}
            onChange={handleChange}
            required={rest.required}
            className={clsx(
              "w-full rounded transition-colors outline-none appearance-none placeholder:text-gray-800 dark:placeholder:text-gray-500",
              sizeClasses,
              paddingClasses,
              getVariantClasses()
            )}
            {...rest}
          />

          {(suffix || loading) && (
            <div className={`absolute right-${iconPos} flex items-center text-gray-700 dark:text-gray-400 pointer-events-none`}>
               {loading ? <Loader2 className="animate-spin h-4 w-4" /> : suffix}
            </div>
          )}
        </div>

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

TextInput.displayName = "TextInput";
export default TextInput;

