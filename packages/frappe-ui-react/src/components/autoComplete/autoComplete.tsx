import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Popover } from "../popover";
import LoadingIndicator from "../loadingIndicator";
import FeatherIcon from "../featherIcon";
import type {
  AutocompleteOption,
  AutocompleteOptionGroup,
  AutocompleteOptions,
  AutocompleteProps,
  Option,
} from "./types";
import { Button } from "../button";

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  options,
  multiple = false,
  label,
  placeholder,
  loading = false,
  hideSearch = false,
  showFooter = false,
  prefix,
  suffix,
  itemPrefix,
  itemSuffix,
  maxOptions = 50,
  compareFn = (a: Option, b: Option) => a?.value === b?.value,
  placement = "bottom-start",
  bodyClasses,
  onChange,
}) => {
  const [query, setQuery] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isOption = useCallback(
    (option: AutocompleteOption): option is Option => {
      return typeof option === "object" && option !== null && "value" in option;
    },
    []
  );

  const isOptionGroup = useCallback(
    (
      option: AutocompleteOptionGroup | AutocompleteOption
    ): option is AutocompleteOptionGroup => {
      return (
        typeof option === "object" &&
        option !== null &&
        "items" in option &&
        "group" in option
      );
    },
    []
  );

  const sanitizeOptions = useCallback(
    (opts: AutocompleteOption[]): Option[] => {
      if (!opts) {
        return [];
      }
      return opts.map((option) => {
        return isOption(option)
          ? option
          : { label: String(option), value: option };
      });
    },
    [isOption]
  );

  const filterOptions = useCallback(
    (opts: Option[]): Option[] => {
      if (!query) {
        return opts;
      }

      const lowerCaseQuery = query.trim().toLowerCase();
      return opts.filter((option) => {
        return (
          option.label.toLowerCase().includes(lowerCaseQuery) ||
          String(option.value).toLowerCase().includes(lowerCaseQuery)
        );
      });
    },
    [query]
  );

  const processOptions = useCallback(
    (opts: AutocompleteOptions) => {
      if (!opts) {
        return [];
      }

      let processedOptions: AutocompleteOptionGroup[];
      if (opts.length > 0 && isOptionGroup(opts[0])) {
        processedOptions = opts as AutocompleteOptionGroup[];
      } else {
        processedOptions = [
          { group: "", items: opts as AutocompleteOption[], hideLabel: false },
        ];
      }

      return processedOptions;
    },
    [isOptionGroup]
  );

  const groups = useMemo<AutocompleteOptionGroup[]>(() => {
    if (!options?.length) {
      return [];
    }

    const processedGroups = processOptions(options);

    return processedGroups
      .map((group, i) => {
        return {
          key: i,
          group: group.group,
          hideLabel: group.hideLabel,
          items: filterOptions(sanitizeOptions(group.items || [])),
        };
      })
      .filter((group) => group.items.length > 0);
  }, [options, processOptions, filterOptions, sanitizeOptions]);

  const allOptions = useMemo<Option[]>(() => {
    return processOptions(options).flatMap((group) => group.items) as Option[];
  }, [options, processOptions]);

  const findOption = useCallback(
    (option: AutocompleteOption): Option | undefined => {
      if (!option) {
        return undefined;
      }

      const value = isOption(option) ? option.value : option;
      return allOptions.find((o) => o.value === value);
    },
    [allOptions, isOption]
  );

  const makeOption = useCallback(
    (option: AutocompleteOption): Option => {
      return isOption(option)
        ? option
        : { label: String(option), value: option };
    },
    [isOption]
  );

  const getLabel = useCallback(
    (option: AutocompleteOption): string => {
      if (isOption(option)) {
        return option.label || String(option.value);
      }
      return String(option);
    },
    [isOption]
  );

  const selectedComboboxValue = useMemo<Option | Option[] | null>(() => {
    if (value === null || value === undefined) {
      return multiple ? [] : null;
    }

    if (!multiple) {
      return (
        findOption(value as AutocompleteOption) ||
        makeOption(value as AutocompleteOption)
      );
    }

    const values = Array.isArray(value) ? value : [];
    return values.map((v) => findOption(v) || makeOption(v));
  }, [value, multiple, findOption, makeOption]);

  const handleComboboxChange = useCallback(
    (val: Option | Option[] | null) => {
      if (!val) return;

      setQuery("");

      if (!multiple) {
        setShowOptions(false);
      }

      const emittedValue = multiple
        ? (val as Option[]).map((o) => o.value)
        : (val as Option)?.value ?? null;

      if (onChange) {
        onChange(emittedValue);
      }
    },
    [multiple, onChange]
  );

  const displayValue = useMemo<string>(() => {
    if (!selectedComboboxValue) {
      return "";
    }

    if (!multiple) {
      return getLabel(selectedComboboxValue as Option);
    }

    return (selectedComboboxValue as Option[])
      .map((v) => getLabel(v))
      .join(", ");
  }, [selectedComboboxValue, multiple, getLabel]);

  const isOptionSelected = useCallback(
    (option: Option): boolean => {
      if (!selectedComboboxValue) {
        return false;
      }

      if (!multiple) {
        return compareFn(selectedComboboxValue as Option, option);
      }

      return (selectedComboboxValue as Option[]).some((v) =>
        compareFn(v, option)
      );
    },
    [selectedComboboxValue, multiple, compareFn]
  );

  const areAllOptionsSelected = useMemo<boolean>(() => {
    if (!multiple) {
      return false;
    }

    return (
      allOptions.length > 0 &&
      allOptions.length === (selectedComboboxValue as Option[])?.length
    );
  }, [multiple, allOptions, selectedComboboxValue]);

  const selectAll = useCallback(() => {
    handleComboboxChange(allOptions);
  }, [allOptions, handleComboboxChange]);

  const clearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleComboboxChange(multiple ? [] : null);
    },
    [multiple, handleComboboxChange]
  );

  useEffect(() => {
    if (showOptions && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [showOptions]);

  const comboboxInputId = useMemo(
    () => `combobox-input-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  return (
    <Combobox
      value={selectedComboboxValue}
      onChange={handleComboboxChange}
      multiple={multiple}
      by={compareFn}
    >
      {({ open: isComboboxOpen }) => (
        <Popover
          show={showOptions}
          onUpdateShow={setShowOptions}
          placement={placement}
          popoverClass={bodyClasses}
          target={({ togglePopover: popoverToggle }) => (
            <div className="w-full space-y-1.5">
              {label && (
                <label
                  htmlFor={comboboxInputId}
                  className="block text-xs text-ink-gray-5"
                >
                  {label}
                </label>
              )}
              <button
                type="button"
                className={`flex h-7 w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 transition-colors hover:bg-surface-gray-3 border border-transparent focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3 focus:outline-none ${
                  isComboboxOpen ? "bg-surface-gray-3" : ""
                }`}
                onClick={popoverToggle}
              >
                <FeatherIcon
                  name="chevron-down"
                  className="h-4 w-4 text-ink-gray-5"
                  aria-hidden="true"
                />
                <div className="flex items-center overflow-hidden">
                  {prefix && prefix(selectedComboboxValue)}
                  <span
                    className={`truncate text-base leading-5 ${
                      displayValue ? "text-ink-gray-8" : "text-ink-gray-4"
                    }`}
                  >
                    {displayValue || placeholder || ""}
                  </span>
                  {suffix && suffix(selectedComboboxValue)}
                </div>
              </button>
            </div>
          )}
          body={({ isOpen: isPopoverOpen }) =>
            isPopoverOpen && (
              <div className="relative mt-1 rounded-lg bg-surface-modal text-base shadow-2xl">
                {!hideSearch && (
                  <div className="sticky top-0 z-[100] flex items-stretch space-x-1.5 bg-surface-modal py-1.5 rounded-lg">
                    <div className="relative w-full rounded flex mx-2 border border-surface-gray-2 bg-surface-gray-2 text-base text-ink-gray-8 placeholder-ink-gray-4 transition-colors hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:bg-surface-white focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 focus:bg-surface-gray-3 hover:bg-surface-gray-4 text-ink-gray-8 cursor-pointer">
                      <ComboboxInput
                        id={comboboxInputId}
                        ref={searchInputRef}
                        className=" h-7 w-full py-1.5 pl-2 pr-2 outline-none"
                        type="text"
                        displayValue={() => query}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setQuery(event.target.value)}
                        autoComplete="off"
                        placeholder="Search"
                      />
                      <div className="inline-flex h-7 w-7 items-center justify-center">
                        {loading ? (
                          <LoadingIndicator className="h-4 w-4 text-ink-gray-5" />
                        ) : (
                          <button type="button" onClick={clearAll}>
                            <FeatherIcon
                              name="x"
                              className="w-4 h-4 text-ink-gray-8"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <ComboboxOptions
                  static
                  className={`max-h-[15rem] overflow-y-auto px-1.5 pb-1.5 ${
                    hideSearch ? "pt-1.5" : ""
                  }`}
                >
                  {groups.length === 0 ? (
                    <li className="rounded-md px-2.5 py-1.5 text-base text-ink-gray-5">
                      No results found
                    </li>
                  ) : (
                    groups.map((group) => (
                      <div
                        key={group.group}
                        className={group.items.length === 0 ? "hidden" : ""}
                      >
                        {group.group && !group.hideLabel && (
                          <div className="sticky top-10 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5">
                            {group.group}
                          </div>
                        )}
                        {group.items.slice(0, maxOptions).map((option, idx) => (
                          <ComboboxOption
                            key={idx}
                            value={option}
                            disabled={(option as Option).disabled}
                            className={({ focus }) =>
                              `flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base ${
                                focus ? "bg-surface-gray-3" : ""
                              } ${
                                (option as Option).disabled ? "opacity-50" : ""
                              }`
                            }
                          >
                            <>
                              <div className="flex flex-1 gap-2 overflow-hidden items-center">
                                {(itemPrefix || multiple) && (
                                  <div className="flex flex-shrink-0">
                                    {itemPrefix ? (
                                      itemPrefix(option as AutocompleteOption)
                                    ) : isOptionSelected(option as Option) ? (
                                      <FeatherIcon
                                        name="check"
                                        className="h-4 w-4 text-ink-gray-7"
                                      />
                                    ) : (
                                      <div className="h-4 w-4" />
                                    )}
                                  </div>
                                )}
                                <span className="flex-1 truncate text-ink-gray-7">
                                  {getLabel(option)}
                                </span>
                              </div>

                              {itemSuffix && (
                                <div className="ml-2 flex-shrink-0">
                                  {itemSuffix(option as Option)}
                                  {(option as Option)?.description && (
                                    <div className="text-sm text-ink-gray-5">
                                      {(option as Option).description}
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          </ComboboxOption>
                        ))}
                      </div>
                    ))
                  )}
                </ComboboxOptions>

                {showFooter && multiple && (
                  <div className="border-t p-1">
                    {multiple ? (
                      <div className="flex items-center justify-end">
                        {!areAllOptionsSelected && (
                          <Button label="Select All" onClick={selectAll} />
                        )}
                        {areAllOptionsSelected && (
                          <Button label="Clear All" onClick={clearAll} />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <Button label="Clear" onClick={clearAll} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          }
        />
      )}
    </Combobox>
  );
};

export default Autocomplete;
