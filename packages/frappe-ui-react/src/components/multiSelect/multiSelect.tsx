/**
 * External dependencies
 */
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";

/**
 * Internal dependencies.
 */
import Popover from "../popover/popover";
import Button from "../button/button";
import LoadingIndicator from "../loadingIndicator";
import type { MultiSelectOption, MultiSelectProps } from "./types";
import clsx from "clsx";

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value = [],
  options,
  placeholder = "Select option",
  hideSearch = false,
  loading = false,
  compareFn = (
    a: NoInfer<MultiSelectOption | null> | object,
    b: NoInfer<MultiSelectOption | null> | object
    //@ts-expect-error -- this is fine since we have specified object type in documentation
  ) => a?.value === b?.value,
  onChange,
  renderOption,
  renderFooter,
}) => {
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerQuery)
    );
  }, [options, query]);

  const clearAll = () => {
    setQuery("");
    onChange?.([]);
  };

  const selectAll = () => {
    setQuery("");
    const allValues = options.map((opt) => opt.value);
    onChange?.(allValues);
  };

  const handleChange = (newValue: MultiSelectOption[]) => {
    onChange?.(newValue.map((opt) => opt.value));
  };

  useEffect(() => {
    if (showOptions && searchInputRef.current && !hideSearch) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [showOptions, hideSearch]);

  return (
    <Popover
      placement="bottom-start"
      show={showOptions}
      onUpdateShow={setShowOptions}
      target={({ togglePopover }) => (
        <Button
          onClick={togglePopover}
          className={clsx(
            "w-full justify-between!",
            value.length === 0 && "text-ink-gray-4!"
          )}
          iconRight={() => <ChevronDown className="w-4 h-4 shrink-0" />}
        >
          {selectedOptions}
        </Button>
      )}
      body={() => (
        <div className="mt-2 shadow-xl rounded-lg border border-outline-gray-1 bg-surface-modal">
          <Combobox
            value={selectedOptionObjects}
            onChange={handleChange}
            by={compareFn}
            multiple
          >
            <div className="relative p-2 pb-0">
              {!hideSearch && (
                <div className="flex w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 ring-2 ring-outline-gray-2 transition-colors hover:bg-surface-gray-3 border border-transparent">
                  <ComboboxInput
                    ref={searchInputRef}
                    displayValue={() => query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for..."
                    className="bg-transparent p-0 focus:outline-0 border-0 focus:border-0 focus:ring-0 text-base text-ink-gray-8 h-full placeholder:text-ink-gray-4 w-full"
                  />
                  <div className="inline-flex gap-1">
                    {loading && (
                      <LoadingIndicator className="size-4 text-ink-gray-5" />
                    )}
                    <X className="size-4 text-ink-gray-9" />
                  </div>
                </div>
              )}

              <div className="z-10 overflow-hidden mt-2">
                <ComboboxOptions
                  static
                  className="max-h-60 overflow-auto pb-1.5 focus:outline-none"
                >
                  {filteredOptions.length === 0 && (
                    <div className="text-ink-gray-5 text-base text-center py-1.5 px-2.5">
                      No results found
                    </div>
                  )}

                  {filteredOptions.map((item) => (
                    <ComboboxOption
                      key={item.value}
                      value={item}
                      disabled={item.disabled}
                      className="text-base leading-none text-ink-gray-7 rounded flex items-center h-7 p-1.5 pr-8 relative select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[focus]:outline-none data-[focus]:bg-surface-gray-3 cursor-pointer"
                    >
                      {({ selected }) => (
                        <>
                          <span className="truncate">
                            {renderOption ? renderOption(item) : item.label}
                          </span>
                          {selected && (
                            <div className="absolute right-2 inline-flex items-center justify-center">
                              <Check className="size-4" />
                            </div>
                          )}
                        </>
                      )}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>

                <hr className="border-outline-gray-3" />

                {renderFooter ? (
                  renderFooter({ clearAll, selectAll })
                ) : (
                  <div className="flex justify-between my-2">
                    <Button variant="ghost" onClick={clearAll}>
                      Clear All
                    </Button>
                    <Button variant="ghost" onClick={selectAll}>
                      Select All
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Combobox>
        </div>
      )}
    />
  );
};
