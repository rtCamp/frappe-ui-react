import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
} from "@headlessui/react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { Popover } from "../popover";
import type { SelectProps, SelectSize } from "./types";

const Select: React.FC<SelectProps> = ({
  htmlId,
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
  const [open, setOpen] = useState(false);

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
        <Popover
          show={open}
          onUpdateShow={setOpen}
          placement="bottom-start"
          target={({ togglePopover }) => (
            <ListboxButton
              id={htmlId}
              onClick={togglePopover}
              className={clsx(
                "relative w-full rounded-md flex items-center justify-between transition-colors focus:outline-none",
                sizeClasses,
                currentVariantClasses,
                !isDisabled && "text-ink-gray-8"
              )}
            >
              <div className="flex items-center gap-2 w-full overflow-hidden">
                {prefix && (
                  <span className="flex-none text-ink-gray-6">{prefix}</span>
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
                <span className="ml-2 flex-none text-ink-gray-6">
                  {suffix ?? <ChevronDown className="h-4 w-4" />}
                </span>
              )}
            </ListboxButton>
          )}
          body={() => (
            <div className="mt-1 max-h-[15rem] overflow-y-auto rounded-lg bg-surface-modal p-1.5 shadow-2xl">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  className={({ focus }) =>
                    clsx(
                      "flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base",
                      focus && "bg-surface-gray-3",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="truncate text-ink-gray-7">
                        {option.label}
                      </span>
                      {selected && (
                        <Check className="h-4 w-4 text-ink-gray-7" />
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </div>
          )}
        />
      </Listbox>
    </div>
  );
};

export default Select;
