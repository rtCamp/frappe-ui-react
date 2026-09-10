/**
 * External dependencies.
 */
import React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronDown, Check } from "lucide-react";

/**
 * Internal dependencies.
 */
import type { SelectOption, SelectProps } from "./types";
import { selectTriggerVariants } from "./variants";
import { cn } from "../../utils";

const DefaultPrefix = () => {
  return <></>;
};

const DefaultSuffix = () => {
  return <ChevronDown className="h-4 w-4" />;
};

const DefaultOption = ({ option }: { option: SelectOption }) => {
  return option.label;
};

const Select: React.FC<SelectProps> = ({
  size = "sm",
  variant = "subtle",
  placeholder,
  disabled = false,
  id,
  value,
  options,
  prefix,
  suffix,
  option,
  onChange,
  className,
  placeholderClassName,
  matchTriggerWidth = false,
}) => {
  const Prefix = prefix ?? DefaultPrefix;
  const Suffix = suffix ?? DefaultSuffix;
  const Option = option ?? DefaultOption;

  return (
    <BaseSelect.Root
      id={id}
      items={options}
      value={value}
      onValueChange={(val) => onChange?.(val ?? undefined)}
      disabled={disabled}
    >
      <BaseSelect.Trigger
        className={cn(
          selectTriggerVariants({
            size,
            variant,
            disabled,
          }),
          className
        )}
      >
        <span className="inline-flex items-center gap-2 min-w-0 flex-1">
          <Prefix />
          <BaseSelect.Value
            placeholder={placeholder}
            className={cn("truncate text-left", placeholderClassName)}
          />
        </span>
        <BaseSelect.Icon className="shrink-0">
          <Suffix />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-60">
          <BaseSelect.Popup
            className={cn(
              "p-1 m-0 bg-surface-modal ring-1 ring-outline-gray-1/5 rounded-lg shadow-2xl will-change-[opacity,transform] overflow-hidden origin-center data-[state=open]:animate-[fadeInScale_100ms] data-[state=closed]:animate-[fadeOutScale_100ms]",
              matchTriggerWidth && "w-(--anchor-width)"
            )}
          >
            <BaseSelect.List className="max-h-60 overflow-auto">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="focus:outline-none rounded min-h-7 px-2 py-1 text-base text-ink-gray-9 flex items-start data-highlighted:bg-surface-gray-2 border-0 data-selected:bg-surface-gray-2 data-disabled:text-ink-gray-4 select-none"
                >
                  <BaseSelect.ItemText className="wrap-break-word min-w-0 flex-1">
                    <Option option={option} />
                  </BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="ml-auto pl-1 inline-flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
};

export default Select;
