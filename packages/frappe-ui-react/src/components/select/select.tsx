import React, { Fragment } from "react";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@headlessui/react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import type { SelectProps, SelectSize } from "./types";

const Select: React.FC<SelectProps> = ({
  size = "md",
  variant = "subtle",
  state,
  loading = false,
  disabled = false,
  value,
  placeholder = "Select...",
  options = [], 
  onChange,
  prefix,
  label,
  error,
  className,
}) => {
  
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: "h-7 text-sm px-2",
    md: "h-8 text-base px-2.5",
    lg: "h-10 text-lg px-3",
  }[size as SelectSize];

  const getVariantClasses = () => {
    if (isDisabled) {
      return "bg-surface-gray-1 border border-transparent text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500";
    }

    if (variant === "subtle") {
      switch (state) {
        case "error":
          return "bg-red-50 text-red-600 border border-transparent hover:bg-red-100 focus:ring-2 focus:ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20";
        case "success":
          return "bg-green-50 text-green-600 border border-transparent hover:bg-green-100 focus:ring-2 focus:ring-green-200 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20";
        case "warning":
          return "bg-orange-50 text-orange-600 border border-transparent hover:bg-orange-100 focus:ring-2 focus:ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20";
        default:
          return "bg-surface-gray-2 text-gray-900 border border-transparent hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700";
      }
    }

    if (variant === "outline") {
      switch (state) {
        case "error":
          return "bg-surface-white text-red-600 border border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200 dark:bg-gray-900 dark:text-red-400 dark:border-red-500";
        case "success":
          return "bg-surface-white text-green-600 border border-green-500 hover:border-green-600 focus:ring-2 focus:ring-green-200 dark:bg-gray-900 dark:text-green-400 dark:border-green-500";
        case "warning":
          return "bg-surface-white text-orange-600 border border-orange-500 hover:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:bg-gray-900 dark:text-orange-400 dark:border-orange-500";
        default:
          return "bg-surface-white text-gray-900 border border-outline-gray-2 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-600";
      }
    }

    if (variant === "ghost") {
      switch (state) {
        case "error":
          return "text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-200 dark:text-red-400 dark:hover:bg-red-500/10";
        case "success":
          return "text-green-600 hover:bg-green-50 focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-500/10";
        case "warning":
          return "text-orange-600 hover:bg-orange-50 focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-500/10";
        default:
          return "text-gray-900 hover:bg-surface-gray-2 focus:ring-2 focus:ring-outline-gray-3 dark:text-gray-200 dark:hover:bg-gray-800";
      }
    }

    return "";
  };

  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      
      <Listbox value={value} onChange={onChange} disabled={isDisabled}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              "relative w-full cursor-default rounded-md flex items-center justify-between transition-all focus:outline-none",
              sizeClasses,
              getVariantClasses()
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {prefix && <span className={isDisabled ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-400"}>{prefix}</span>}
              <span className={clsx("block truncate", !value && "text-gray-800 dark:text-gray-400")}>
                {value ? value.label : placeholder}
              </span>
            </div>
            <span className="pointer-events-none flex items-center">
              {loading ? (
                 <Loader2 className="h-4 w-4 animate-spin text-gray-700 dark:text-gray-400" />
              ) : (
                 <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-400" aria-hidden="true" />
              )}
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions 
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-gray-900 dark:ring-gray-700"
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.value} 
                  className={({ focus }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      focus 
                        ? "bg-surface-gray-2 text-gray-900 dark:bg-gray-800 dark:text-white" 
                        : "text-gray-900 dark:text-gray-300",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )
                  }
                  value={option}
                  disabled={option.disabled}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900 dark:text-white">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Select;

