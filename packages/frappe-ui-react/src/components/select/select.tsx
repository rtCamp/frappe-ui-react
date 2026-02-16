import React, { useMemo } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";
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
      {
        variant: "subtle",
        state: "default",
        disabled: false,
        class:
          "bg-surface-gray-2 border border-surface-gray-2 hover:bg-surface-gray-3 focus:bg-surface-white focus:ring-2 focus:ring-outline-gray-3",
      },
      {
        variant: "outline",
        state: "default",
        disabled: false,
        class:
          "bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 focus:ring-2 focus:ring-outline-gray-3",
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
  "flex items-center justify-between rounded px-2.5 py-1.5 text-base cursor-pointer data-[highlighted]:bg-surface-gray-3 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[selected]:font-semibold"
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

  const selectedValue = value?.value;

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === selectedValue),
    [options, selectedValue]
  );

  return (
    <div className={cn("w-full", className)}>
      <BaseSelect.Root
        value={selectedValue}
        onValueChange={(val) => {
          const selected = options.find((opt) => opt.value === val);
          if (selected) {
            onChange?.(selected);
          }
        }}
        disabled={isDisabled}
      >
        <BaseSelect.Trigger
          id={htmlId}
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

            {selectedOption?.icon && (
              <span className="flex-none text-ink-gray-6">
                {selectedOption.icon}
              </span>
            )}

            <span
              className={cn(
                "truncate flex-1 text-left",
                !selectedOption && "text-ink-gray-5"
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
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
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner
            side="bottom"
            align="start"
            sideOffset={4}
            className="z-100"
          >
            <BaseSelect.Popup className="min-w-[var(--anchor-width)] max-h-[15rem] overflow-y-auto rounded-lg bg-surface-modal p-1.5 shadow-2xl border border-outline-gray-1">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={optionVariants()}
                  data-testid="select-option"
                >
                  <span className="flex items-center gap-2 truncate text-ink-gray-7">
                    {option.icon && (
                      <span className="flex-none">{option.icon}</span>
                    )}
                    {option.label}
                  </span>

                  <BaseSelect.ItemIndicator>
                    <Check className="h-4 w-4 text-ink-gray-7" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
};

export default Select;
