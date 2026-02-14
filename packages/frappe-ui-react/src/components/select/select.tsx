import React, { useState } from "react";
import { Listbox, ListboxButton, ListboxOption } from "@headlessui/react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";
import { Popover } from "../popover";
import type { SelectProps, SelectSize } from "./types";

const selectVariants = cva(
  "relative w-full rounded-md flex items-center justify-between transition-colors focus:outline-none",
  {
    variants: {
      size: {
        sm: "h-7 text-sm px-2",
        md: "h-8 text-base px-2.5",
        lg: "h-10 text-lg px-3",
      },
      variant: {
        subtle: "",
        outline: "",
        ghost: "",
      },
      state: {
        default: "",
        error: "",
        success: "",
        warning: "",
      },
      disabled: {
        true: "bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2 cursor-not-allowed",
        false: "text-ink-gray-8",
      },
    },
    compoundVariants: [
      // Subtle
      {
        variant: "subtle",
        state: "default",
        disabled: false,
        class:
          "bg-surface-gray-2 border border-surface-gray-2 hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3",
      },
      {
        variant: "subtle",
        state: "error",
        disabled: false,
        class:
          "bg-surface-red-2 border border-surface-red-2 hover:bg-surface-red-3 focus:ring-2 focus:ring-outline-red-2",
      },
      {
        variant: "subtle",
        state: "success",
        disabled: false,
        class:
          "bg-surface-green-2 border border-surface-green-2 hover:bg-surface-green-1 focus:ring-2 focus:ring-outline-green-2",
      },
      {
        variant: "subtle",
        state: "warning",
        disabled: false,
        class:
          "bg-surface-amber-1 border border-surface-amber-1 hover:bg-surface-amber-2 focus:ring-2 focus:ring-outline-amber-2",
      },
      // Outline
      {
        variant: "outline",
        state: "default",
        disabled: false,
        class:
          "bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3",
      },
      {
        variant: "outline",
        state: "error",
        disabled: false,
        class:
          "bg-surface-white border border-outline-red-2 hover:border-outline-red-3 focus:ring-2 focus:ring-outline-red-2",
      },
      {
        variant: "outline",
        state: "success",
        disabled: false,
        class:
          "bg-surface-white border border-outline-green-2 hover:border-outline-green-3 focus:ring-2 focus:ring-outline-green-2",
      },
      {
        variant: "outline",
        state: "warning",
        disabled: false,
        class:
          "bg-surface-white border border-outline-amber-2 hover:border-outline-amber-3 focus:ring-2 focus:ring-outline-amber-2",
      },
      // Ghost
      {
        variant: "ghost",
        state: "default",
        disabled: false,
        class: "hover:bg-surface-gray-3 focus:ring-2 focus:ring-outline-gray-3",
      },
      {
        variant: "ghost",
        state: "error",
        disabled: false,
        class: "hover:bg-surface-red-3 focus:ring-2 focus:ring-outline-red-2",
      },
      {
        variant: "ghost",
        state: "success",
        disabled: false,
        class:
          "hover:bg-surface-green-2 focus:ring-2 focus:ring-outline-green-2",
      },
      {
        variant: "ghost",
        state: "warning",
        disabled: false,
        class:
          "hover:bg-surface-amber-2 focus:ring-2 focus:ring-outline-amber-2",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "subtle",
      state: "default",
      disabled: false,
    },
  }
);

const optionVariants = cva(
  "flex items-center justify-between rounded px-2.5 py-1.5 text-base",
  {
    variants: {
      focused: {
        true: "bg-surface-gray-3",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      focused: false,
      disabled: false,
    },
  }
);

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

  return (
    <div className={cn("w-full", className)}>
      <Listbox value={value} onChange={onChange} disabled={isDisabled}>
        <Popover
          show={open}
          onUpdateShow={setOpen}
          placement="bottom-start"
          target={({ togglePopover }) => (
            <ListboxButton
              id={htmlId}
              onClick={togglePopover}
              aria-invalid={state === "error"}
              aria-busy={loading}
              className={cn(
                selectVariants({
                  size: size as SelectSize,
                  variant,
                  state: stateKey,
                  disabled: isDisabled,
                })
              )}
            >
              <div className="flex items-center gap-2 w-full overflow-hidden">
                {prefix && (
                  <span className="flex-none text-ink-gray-6">{prefix}</span>
                )}

                {value?.icon && (
                  <span className="flex-none text-ink-gray-6">
                    {value.icon}
                  </span>
                )}

                <span
                  className={cn(
                    "truncate flex-1 text-left",
                    !value && "text-ink-gray-5"
                  )}
                >
                  {value ? value.label : placeholder}
                </span>
              </div>

              {loading ? (
                <Loader2
                  aria-label="loading"
                  className="ml-2 h-4 w-4 animate-spin text-ink-gray-6"
                />
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
                    cn(
                      optionVariants({
                        focused: focus,
                        disabled: option.disabled,
                      })
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="flex items-center gap-2 truncate text-ink-gray-7">
                        {option.icon && (
                          <span className="flex-none">{option.icon}</span>
                        )}
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
