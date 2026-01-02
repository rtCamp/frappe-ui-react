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
  suffix,
  prefixIcon,
  suffixIcon,
  label,
  error,
  className,
}) => {

  const isDisabled = disabled || loading;
  const stateKey = state ?? "default";


  const sizeClasses = {
    sm: "h-7 text-sm px-2",
    md: "h-8 text-base px-2.5",
    lg: "h-10 text-lg px-3",
  }[size as SelectSize];

  const subtleClasses = {
    default:
      "bg-gray-100 text-gray-900 border border-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-outline-gray-3 dark:bg-white/10 dark:text-[#999999] dark:border-white/10 dark:hover:bg-white/20",
    error:
      "bg-red-50 text-red-700 border border-red-50 hover:bg-red-100 focus:ring-2 focus:ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/10 dark:hover:bg-red-500/20",
    success:
      "bg-green-50 text-green-700 border border-green-50 hover:bg-green-100 focus:ring-2 focus:ring-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/10 dark:hover:bg-green-500/20",
    warning:
      "bg-orange-50 text-orange-700 border border-orange-50 hover:bg-orange-100 focus:ring-2 focus:ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/10 dark:hover:bg-orange-500/20",
  };

  const outlineClasses = {
    default:
      "bg-white text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-outline-gray-3 dark:bg-transparent dark:text-[#999999] dark:border-white/10 dark:hover:border-white/20",
    error:
      "bg-white text-red-700 border border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200 dark:bg-transparent dark:text-red-400 dark:border-red-500",
    success:
      "bg-white text-green-700 border border-green-500 hover:border-green-600 focus:ring-2 focus:ring-green-200 dark:bg-transparent dark:text-green-400 dark:border-green-500",
    warning:
      "bg-white text-orange-700 border border-orange-500 hover:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:bg-transparent dark:text-orange-400 dark:border-orange-500",
  };

  const ghostClasses = {
    default:
      "text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-outline-gray-3 dark:text-[#999999] dark:hover:bg-white/10",
    error:
      "text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-200 dark:text-red-400 dark:hover:bg-red-500/10",
    success:
      "text-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-500/10",
    warning:
      "text-orange-700 hover:bg-orange-50 focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-500/10",
  };

  const disabledClass =
    "bg-gray-100 border border-gray-100 text-gray-500 cursor-not-allowed dark:bg-white/5 dark:text-gray-500";

  const variantMap = {
    subtle: subtleClasses,
    outline: outlineClasses,
    ghost: ghostClasses,
  };

 const currentVariantClasses = isDisabled
  ? disabledClass
  : variantMap[variant][stateKey];


  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-gray-900 dark:text-[#999999]">
          {label}
        </label>
      )}

      <Listbox value={value} onChange={onChange} disabled={isDisabled}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              "relative w-full cursor-default rounded-md flex items-center justify-between transition-all focus:outline-none",
              sizeClasses,
              currentVariantClasses
            )}
          >
            <div className="flex items-center space-x-2 w-full">
              {prefix && (
                <span className={clsx(
                  "flex-none flex items-center",
                  isDisabled ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-[#999999]"
                )}>
                  {prefixIcon}
                </span>
              )}

              <span className={clsx("truncate flex-1 text-left", !value && "text-gray-800 dark:text-[#999999]")}>
                {value ? value.label : placeholder}
              </span>
            </div>

            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin text-gray-700 dark:text-[#999999]" />
            ) : suffix ? (
              <span className="ml-auto flex-none h-4 w-4 text-gray-700 dark:text-[#999999]">
                {suffixIcon || <ChevronDown className="h-4 w-4" />}
              </span>
            ) : null}
          </ListboxButton>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-white/10 dark:ring-white/10"
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  className={({ focus }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      focus
                        ? "bg-gray-100 text-gray-900 dark:bg-white/20 dark:text-[#999999]"
                        : "text-gray-900 dark:text-[#999999]",
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
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900 dark:text-[#999999]">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
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


