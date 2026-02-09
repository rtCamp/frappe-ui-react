/**
 * External dependencies
 */
import React, { useState, useMemo } from "react";
import { Combobox } from "@base-ui/react";
import { Check, ChevronDown, X } from "lucide-react";

/**
 * Internal dependencies.
 */
import Button from "../button/button";
import LoadingIndicator from "../loadingIndicator";
import type { MultiSelectOption, MultiSelectProps } from "./types";
import clsx from "clsx";

const defaultCompareFn = (
  a: NoInfer<MultiSelectOption | null> | object,
  b: NoInfer<MultiSelectOption | null> | object
) => (a as MultiSelectOption).value === (b as MultiSelectOption).value;

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value = [],
  options,
  placeholder = "Select option",
  hideSearch = false,
  loading = false,
  compareFn = defaultCompareFn,
  onChange,
  renderOption,
  renderFooter,
}) => {
  const [query, setQuery] = useState("");

  const selectedOptionObjects = useMemo<MultiSelectOption[]>(() => {
    return value
      .map((val) => options.find((opt) => opt.value === val))
      .filter((opt): opt is MultiSelectOption => opt !== undefined);
  }, [value, options]);

  const selectedOptions = useMemo(() => {
    if (selectedOptionObjects.length === 0) return placeholder;
    const labels = selectedOptionObjects.map((opt) => opt.label);
    return labels.join(", ");
  }, [selectedOptionObjects, placeholder]);

  const clearAll = () => {
    setQuery("");
    onChange?.([]);
  };

  const selectAll = () => {
    setQuery("");
    const allValues = options
      .filter((opt) => !opt.disabled)
      .map((opt) => opt.value);
    onChange?.(allValues);
  };

  const handleChange = (newValue: MultiSelectOption[]) => {
    onChange?.(newValue.map((opt) => opt.value));
  };

  return (
    <Combobox.Root
      items={options}
      multiple
      value={selectedOptionObjects}
      onValueChange={handleChange}
      isItemEqualToValue={compareFn}
    >
      <Combobox.Trigger
        render={
          <Button
            className={clsx(
              "w-full justify-between!",
              value.length === 0 && "text-ink-gray-4!"
            )}
            iconRight={() => <ChevronDown className="w-4 h-4 shrink-0" />}
          >
            <span className="truncate block text-left">{selectedOptions}</span>
          </Button>
        }
      />

      <Combobox.Portal>
        <Combobox.Positioner className="group" sideOffset={8} align="start">
          <Combobox.Popup className="shadow-xl rounded-lg border border-outline-gray-1 bg-surface-modal p-2 w-(--anchor-width)">
            {!hideSearch && (
              <div className="flex w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 ring-2 ring-outline-gray-2 transition-colors hover:bg-surface-gray-3 border border-transparent mb-2">
                <Combobox.Input
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for..."
                  className="bg-transparent p-0 focus:outline-0 border-0 focus:border-0 focus:ring-0 text-base text-ink-gray-8 h-full placeholder:text-ink-gray-4 w-full"
                />
                <div className="inline-flex gap-1">
                  {loading && (
                    <LoadingIndicator className="size-4 text-ink-gray-5" />
                  )}
                  <Combobox.Clear
                    keepMounted={query !== ""}
                    onClick={() => setQuery("")}
                  >
                    <X className="size-4 text-ink-gray-9" />
                  </Combobox.Clear>
                </div>
              </div>
            )}

            <Combobox.Empty className="text-ink-gray-5 text-base text-center py-1.5 px-2.5 hidden group-data-empty:block">
              No results found
            </Combobox.Empty>

            <Combobox.List className="max-h-60 overflow-auto pb-1.5 focus:outline-none">
              {(item) => (
                <Combobox.Item
                  key={item.value}
                  value={item}
                  disabled={item.disabled}
                  className="text-base leading-none text-ink-gray-7 rounded flex items-center h-7 p-1.5 pr-8 relative select-none data-disabled:opacity-50 data-disabled:pointer-events-none data-highlighted:outline-none data-highlighted:bg-surface-gray-3 cursor-pointer"
                >
                  <span className="w-full overflow-x-clip text-ellipsis whitespace-nowrap">
                    {renderOption ? renderOption(item) : item.label}
                  </span>
                  <Combobox.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
                    <Check className="size-4" />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </Combobox.List>

            <hr className="border-outline-gray-3 mb-2" />

            {renderFooter ? (
              renderFooter({ clearAll, selectAll })
            ) : (
              <div className="flex justify-between gap-2">
                <Button variant="ghost" onClick={clearAll}>
                  Clear All
                </Button>
                <Button variant="ghost" onClick={selectAll}>
                  Select All
                </Button>
              </div>
            )}
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
