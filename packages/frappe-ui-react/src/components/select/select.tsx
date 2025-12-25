import React, { Fragment } from "react";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import type { SelectProps } from "./types";

const Select: React.FC<SelectProps> = ({
  size = "md",
  variant = "subtle",
  disabled = false,
  value,
  placeholder = "Select...",
  options,
  onChange,
  prefix,
  label,
  error,
  className,
}) => {
  
  const sizeClasses = {
    sm: "h-7 text-sm px-2",
    md: "h-8 text-base px-2.5",
    lg: "h-10 text-lg px-3",
    xl: "h-12 text-xl px-3",
  }[size];

  const variantClasses = {
    subtle: disabled
      ? "bg-surface-gray-1 border-transparent text-ink-gray-4"
      : "bg-surface-gray-2 border-surface-gray-2 text-ink-gray-8 hover:bg-surface-gray-3 focus:ring-2 focus:ring-outline-gray-3",
    outline: disabled
      ? "bg-surface-gray-1 border-outline-gray-2 text-ink-gray-4"
      : "bg-surface-white border-outline-gray-2 text-ink-gray-8 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3",
    ghost: disabled
      ? "text-ink-gray-4"
      : "bg-transparent border-transparent text-ink-gray-8 hover:bg-surface-gray-3",
  }[variant];

  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-ink-gray-5">
          {label}
        </label>
      )}
      
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              "relative w-full cursor-default rounded-md border flex items-center justify-between transition-all focus:outline-none",
              sizeClasses,
              variantClasses,
              error && "border-red-500 focus:ring-red-200"
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {prefix && <span className="text-ink-gray-5">{prefix}</span>}
              <span className={clsx("block truncate", !value && "text-ink-gray-4")}>
                {value ? value.label : placeholder}
              </span>
            </div>
            <span className="pointer-events-none flex items-center">
              <ChevronDown className="h-4 w-4 text-ink-gray-5" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option, idx) => (
                <ListboxOption
                  key={idx}
                  className={({ focus }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      focus ? "bg-surface-gray-2 text-ink-gray-8" : "text-ink-gray-8",
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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ink-gray-8">
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
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
