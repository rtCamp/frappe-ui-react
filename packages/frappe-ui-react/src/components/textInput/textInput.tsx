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
import type { TextInputProps, SizeKey } from "./types";

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
    const stateKey = state ?? "default";


    const sizeClasses = {
      sm: "text-sm h-7",
      md: "text-base h-8",
      lg: "text-lg h-10",
      xl: "text-xl h-12",
    }[size as SizeKey];

    const iconLeftPosClasses = {
      sm: "left-2",
      md: "left-2.5",
      lg: "left-3",
      xl: "left-3.5",
    }[size as SizeKey];

    const iconRightPosClasses = {
      sm: "right-2",
      md: "right-2.5",
      lg: "right-3",
      xl: "right-3.5",
    }[size as SizeKey];

    const paddingClasses = clsx(
      "py-1.5",
      prefix
        ? { sm: "pl-10", md: "pl-11", lg: "pl-12", xl: "pl-14" }[size as SizeKey]
        : { sm: "pl-2", md: "pl-2.5", lg: "pl-3", xl: "pl-3.5" }[size as SizeKey],
      (suffix || loading)
        ? { sm: "pr-10", md: "pr-11", lg: "pr-12", xl: "pr-14" }[size as SizeKey]
        : { sm: "pr-2", md: "pr-2.5", lg: "pr-3", xl: "pr-3.5" }[size as SizeKey]
    );

    const subtleClasses = {
      
      default: "bg-gray-100 text-gray-900 border border-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-outline-gray-3 dark:bg-[var(--surface-white,rgba(15,15,15,1))] dark:text-[var(--text-icons-gray-8,rgba(212,212,212,1))] dark:border-gray-800 dark:hover:bg-gray-700",
      error: "bg-red-50 text-red-700 border border-red-50 hover:bg-red-100 focus:bg-white focus:ring-2 focus:ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/10 dark:hover:bg-red-500/20",
      success: "bg-green-50 text-green-700 border border-green-50 hover:bg-green-100 focus:bg-white focus:ring-2 focus:ring-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/10 dark:hover:bg-green-500/20",
      warning: "bg-orange-50 text-orange-700 border border-orange-50 hover:bg-orange-100 focus:bg-white focus:ring-2 focus:ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/10 dark:hover:bg-orange-500/20",
    };

    const outlineClasses = {
    default:
      "bg-white text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-outline-gray-3 dark:bg-transparent dark:text-[var(--text-icons-gray-5,rgba(128,128,128,1))] dark:border-white/10 dark:hover:border-white/20",
    error:
      "bg-white text-red-700 border border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200 dark:bg-transparent dark:text-red-400 dark:border-red-500",
    success:
      "bg-white text-green-700 border border-green-500 hover:border-green-600 focus:ring-2 focus:ring-green-200 dark:bg-transparent dark:text-green-400 dark:border-green-500",
    warning:
      "bg-white text-orange-700 border border-orange-500 hover:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:bg-transparent dark:text-orange-400 dark:border-orange-500",
  };

    const disabledClass = "bg-gray-100 border border-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-800 dark:text-gray-500";

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
        {label && (
          <label className="mb-1.5 block text-xs font-medium text-gray-900 dark:text-white" htmlFor={id}>
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {prefix && (
            <div className={clsx("absolute flex items-center text-gray-700 dark:text-gray-400 pointer-events-none", iconLeftPosClasses)}>
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
              currentVariantClasses
            )}
            {...rest}
          />

          {(suffix || loading) && (
            <div className={clsx("absolute flex items-center text-gray-700 dark:text-gray-400 pointer-events-none", iconRightPosClasses)}>
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

