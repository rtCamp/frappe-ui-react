import React, { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
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
      "bg-surface-gray-2 border border-surface-gray-2 hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3",
    error:
      "bg-surface-red-2 border border-surface-red-2 hover:bg-surface-red-3 focus:ring-2 focus:ring-outline-red-2",
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
    default: "hover:bg-surface-gray-3 focus:ring-2 focus:ring-outline-gray-3",
    error: "hover:bg-surface-red-3 focus:ring-2 focus:ring-outline-red-2",
    success: "hover:bg-surface-green-2 focus:ring-2 focus:ring-outline-green-2",
    warning: "hover:bg-surface-amber-2 focus:ring-2 focus:ring-outline-amber-2",
  };

  const disabledClass =
    "bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2 cursor-not-allowed";

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
      <Listbox value={value} onChange={onChange} disabled={isDisabled}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              "relative w-full cursor-default rounded-md flex items-center justify-between transition-colors focus:outline-none",
              sizeClasses,
              currentVariantClasses,
              !isDisabled && "text-ink-gray-8"
            )}
          >
            <div className="flex items-center gap-2 w-full">
              {prefix && (
                <span className="flex-none flex items-center text-ink-gray-6">
                  {prefix}
                </span>
              )}

              <span
                className={clsx(
                  "truncate flex-1 text-left",
                  !value && "text-ink-gray-5"
                )}
              >
                {value ? value.label : placeholder}
              </span>
            </div>

            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin text-ink-gray-6" />
            ) : (
              <span className="ml-auto flex-none h-4 w-4 text-ink-gray-6">
                {suffix ?? <ChevronDown className="h-4 w-4" />}
              </span>
            )}
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  className={({ focus }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4 text-ink-gray-8",
                      focus && "bg-surface-gray-3",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ink-gray-8">
                          <Check className="h-4 w-4" />
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
    </div>
  );
};

export default Select;
