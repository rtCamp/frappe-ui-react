/**
 * External dependencies.
 */
import React, {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Combobox as BaseCombobox } from "@base-ui/react";

/**
 * Internal dependencies.
 */
import { Button } from "../button";
import LoadingIndicator from "../loadingIndicator";
import { Check, Close, SmallDown } from "../../icons";
import { cn } from "../../utils";
import type {
  AutocompleteChangeValue,
  AutocompleteOption,
  AutocompleteProps,
} from "./types";
import {
  defaultCompareFn,
  filterGroups,
  flattenGroups,
  getEmittedValue,
  getOptionLabel,
  getNextSelectedOptionCache,
  hasAllSelectedOptions,
  parsePlacement,
  type InternalSelection,
  type InternalOption,
  type InternalOptionGroup,
  processOptions,
  resolveSelectedOptions,
} from "./utils";

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  options,
  children,
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
  keepSelectedVisible = false,
  searchValue,
  open,
  compareFn = defaultCompareFn,
  placement = "bottom-start",
  bodyClasses,
  className,
  labelClassName,
  triggerClassName,
  searchInputClassName,
  listClassName,
  emptyMessage,
  renderFooter,
  onOpenChange,
  onSearchChange,
  onChange,
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedOptionCache, setSelectedOptionCache] =
    useState<InternalSelection>(multiple ? [] : null);
  const [settledGroups, setSettledGroups] = useState<InternalOptionGroup[]>(
    () => processOptions(options)
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const comboboxInputId = useId();
  const triggerId = useId();
  const isSearchControlled = searchValue !== undefined;
  const query = isSearchControlled ? (searchValue ?? "") : internalQuery;
  const isOpenControlled = open !== undefined;
  const popupOpen = isOpenControlled ? open : internalOpen;

  const processedOptions = useMemo(() => processOptions(options), [options]);

  useEffect(() => {
    if (!isSearchControlled || loading) {
      return;
    }

    // Defer settled-options updates so typing and focus interactions stay responsive.
    startTransition(() => {
      setSettledGroups(processedOptions);
    });
  }, [isSearchControlled, loading, processedOptions]);

  const displayedGroups = useMemo(() => {
    if (!isSearchControlled || !loading || processedOptions.length > 0) {
      return processedOptions;
    }

    return settledGroups;
  }, [isSearchControlled, loading, processedOptions, settledGroups]);

  const currentOptions = useMemo(
    () => flattenGroups(displayedGroups),
    [displayedGroups]
  );

  const visibleGroups = useMemo(() => {
    const effectiveQuery = isSearchControlled && !loading ? "" : query;
    const filtered = filterGroups(displayedGroups, effectiveQuery, maxOptions);

    if (!keepSelectedVisible) return filtered;

    // Ensure selected options are visible even if they don't match the query.
    const selectionArray = Array.isArray(selectedOptionCache)
      ? selectedOptionCache
      : selectedOptionCache
        ? [selectedOptionCache]
        : [];

    if (!selectionArray.length) return filtered;

    const withoutSelected = filtered
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => !selectionArray.some((sel) => compareFn(item, sel))
        ),
      }))
      .filter((group) => group.items.length > 0);

    return [
      { group: "", hideLabel: true, items: selectionArray },
      ...withoutSelected,
    ];
  }, [
    compareFn,
    displayedGroups,
    isSearchControlled,
    keepSelectedVisible,
    loading,
    maxOptions,
    query,
    selectedOptionCache,
  ]);

  const renderedOptions = useMemo(
    () => flattenGroups(visibleGroups),
    [visibleGroups]
  );

  const getLabel = useCallback((option: AutocompleteOption): string => {
    return getOptionLabel(option);
  }, []);

  const selectedComboboxValue = useMemo<InternalSelection>(() => {
    return resolveSelectedOptions({
      value,
      multiple,
      currentOptions,
      selectedOptionCache,
    });
  }, [value, multiple, currentOptions, selectedOptionCache]);

  const updateQuery = useCallback(
    (nextQuery: string) => {
      if (!isSearchControlled) {
        setInternalQuery(nextQuery);
      }

      onSearchChange?.(nextQuery);
    },
    [isSearchControlled, onSearchChange]
  );

  const setPopupOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange]
  );

  const handleComboboxChange = useCallback(
    (val: InternalSelection) => {
      updateQuery("");

      const nextSelectedOptionCache = getNextSelectedOptionCache(val, multiple);

      if (nextSelectedOptionCache !== undefined) {
        setSelectedOptionCache(nextSelectedOptionCache);
      }

      if (!multiple) {
        setPopupOpen(false);
      }

      const emittedValue: AutocompleteChangeValue = getEmittedValue(
        val,
        multiple
      );

      onChange?.(emittedValue, val);
    },
    [multiple, onChange, setPopupOpen, updateQuery]
  );

  const displayValue = useMemo<string>(() => {
    if (!selectedComboboxValue) {
      return "";
    }

    if (!multiple) {
      return getLabel(selectedComboboxValue as InternalOption);
    }

    return (selectedComboboxValue as InternalOption[])
      .map((v) => getLabel(v))
      .join(", ");
  }, [selectedComboboxValue, multiple, getLabel]);

  const isOptionSelected = useCallback(
    (option: InternalOption): boolean => {
      if (!selectedComboboxValue) {
        return false;
      }

      if (!multiple) {
        return compareFn(selectedComboboxValue as InternalOption, option);
      }

      return (selectedComboboxValue as InternalOption[]).some((v) =>
        compareFn(v, option)
      );
    },
    [selectedComboboxValue, multiple, compareFn]
  );

  const areAllOptionsSelected = useMemo<boolean>(() => {
    return multiple
      ? hasAllSelectedOptions(currentOptions, selectedComboboxValue, compareFn)
      : false;
  }, [multiple, currentOptions, selectedComboboxValue, compareFn]);

  const selectAll = useCallback(() => {
    handleComboboxChange(currentOptions);
  }, [currentOptions, handleComboboxChange]);

  const clearAll = useCallback(() => {
    if (multiple) {
      handleComboboxChange([]);
      return;
    }

    updateQuery("");
  }, [multiple, handleComboboxChange, updateQuery]);

  const handleClearClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      clearAll();
    },
    [clearAll]
  );

  useEffect(() => {
    if (popupOpen && !hideSearch && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [hideSearch, popupOpen]);

  const isSameOption = useCallback(
    (itemValue: InternalOption, selectedValue: InternalOption) => {
      return compareFn(itemValue, selectedValue);
    },
    [compareFn]
  );

  const resolvedEmptyMessage =
    emptyMessage ?? (query ? `No results found for "${query}"` : undefined);
  const showEmptyState =
    !loading && visibleGroups.length === 0 && Boolean(resolvedEmptyMessage);
  const popupPlacement = useMemo(() => parsePlacement(placement), [placement]);

  const defaultTriggerContent = (
    <button
      type="button"
      className={cn(
        "flex h-7 w-full max-w-md items-center justify-between gap-2 rounded border border-transparent bg-surface-gray-2 px-2 py-1 transition-colors hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:outline-none focus:ring-2 focus:ring-outline-gray-3 data-popup-open:bg-surface-gray-3",
        triggerClassName
      )}
    >
      <div className="flex items-center flex-1 min-w-0 overflow-hidden">
        {prefix && prefix(selectedComboboxValue)}
        <span
          className={cn(
            "truncate text-base leading-5",
            displayValue ? "text-ink-gray-8" : "text-ink-gray-4"
          )}
        >
          {displayValue || placeholder || ""}
        </span>
        {suffix && suffix(selectedComboboxValue)}
      </div>
      <SmallDown
        className="w-4 h-4 shrink-0 text-ink-gray-5"
        aria-hidden="true"
      />
    </button>
  );

  const triggerContent =
    typeof children === "function"
      ? children({
          displayValue,
          placeholder,
          multiple,
          open: popupOpen,
          selectedOption: selectedComboboxValue,
        })
      : React.isValidElement(children)
        ? children
        : defaultTriggerContent;

  const footerContent = renderFooter?.({
    clearAll,
    selectAll,
    allOptionsSelected: areAllOptionsSelected,
    selectedOption: selectedComboboxValue,
  });
  const showFooterSection = Boolean(renderFooter) || (multiple && showFooter);

  return (
    <div className={cn("min-w-24 w-full", className)}>
      <BaseCombobox.Root
        items={renderedOptions}
        value={selectedComboboxValue}
        multiple={multiple}
        open={popupOpen}
        autoHighlight
        filter={null}
        highlightItemOnHover
        itemToStringLabel={(item) => item.label}
        isItemEqualToValue={isSameOption}
        onOpenChange={(nextOpen) => setPopupOpen(nextOpen)}
        onInputValueChange={(nextQuery, details) => {
          if (details.reason === "item-press") {
            return;
          }

          updateQuery(nextQuery);
        }}
        onValueChange={handleComboboxChange}
        data-testid="autocomplete-component"
      >
        <div className="w-full space-y-1.5">
          {label && (
            <label
              htmlFor={triggerId}
              className={cn("block text-xs text-ink-gray-5", labelClassName)}
            >
              {label}
            </label>
          )}

          <BaseCombobox.Trigger
            id={triggerId}
            aria-label="Toggle options"
            render={triggerContent}
          />
        </div>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner
            side={popupPlacement.side}
            align={popupPlacement.align}
            sideOffset={4}
            className="z-100"
          >
            <BaseCombobox.Popup
              className={cn(
                "relative mt-1 w-(--anchor-width) max-w-md overflow-hidden rounded-lg bg-surface-modal text-base shadow-2xl",
                bodyClasses
              )}
            >
              {!hideSearch && (
                <div className="flex items-stretch space-x-1.5 rounded-lg bg-surface-modal py-1.5">
                  <div className="relative mx-1.5 flex w-full rounded bg-surface-gray-2 text-base text-ink-gray-8 placeholder-ink-gray-4 transition-colors hover:border-outline-gray-modals focus-within:border-outline-gray-4 focus-within:bg-surface-gray-3 hover:bg-surface-gray-4 cursor-pointer">
                    <BaseCombobox.Input
                      id={comboboxInputId}
                      ref={searchInputRef}
                      data-testid="autocomplete"
                      value={query}
                      placeholder="Search"
                      autoComplete="off"
                      className={cn(
                        "h-7 w-full bg-transparent py-1.5 pl-2 pr-2 outline-none",
                        searchInputClassName
                      )}
                    />

                    <div className="inline-flex items-center justify-center h-7 w-7">
                      {loading ? (
                        <LoadingIndicator
                          data-testid="loading-indicator"
                          className="w-4 h-4 text-ink-gray-5"
                        />
                      ) : (
                        <button
                          type="button"
                          aria-label="Clear"
                          onClick={handleClearClick}
                        >
                          <Close className="w-4 h-4 text-ink-gray-8" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <BaseCombobox.List
                className={cn(
                  "max-h-60 overflow-y-auto px-1.5 pb-1.5",
                  hideSearch && "pt-1.5",
                  visibleGroups.length === 0 && !showEmptyState && "p-0",
                  listClassName
                )}
              >
                {showEmptyState ? (
                  <div className="w-full rounded-md px-2.5 py-1.5 text-base text-center wrap-break-word text-ink-gray-5">
                    {resolvedEmptyMessage}
                  </div>
                ) : (
                  visibleGroups.map((group, groupIndex) => (
                    <div key={`${group.group}-${groupIndex}`}>
                      {group.group && !group.hideLabel && (
                        <div className="sticky top-0 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5">
                          {group.group}
                        </div>
                      )}

                      {group.items.map((option, optionIndex) => (
                        <BaseCombobox.Item
                          key={`${group.group}-${groupIndex}-${String(option.value)}-${optionIndex}`}
                          value={option}
                          disabled={option.disabled}
                          className={cn(
                            "flex cursor-pointer items-center rounded px-2.5 py-1.5 text-base text-ink-gray-7 outline-none",
                            "data-disabled:pointer-events-none data-disabled:opacity-50",
                            "data-highlighted:bg-surface-gray-3"
                          )}
                        >
                          <div className="flex items-center flex-1 min-w-0 gap-2 overflow-hidden">
                            {itemPrefix && (
                              <div className="flex items-center shrink-0">
                                {itemPrefix(option)}
                              </div>
                            )}

                            <span className="flex-1 min-w-0 truncate text-ink-gray-7">
                              {option.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 ml-2 shrink-0">
                            {itemSuffix && (
                              <div className="min-w-0 overflow-hidden text-right max-w-56">
                                {itemSuffix(option)}
                                {option.description && (
                                  <div className="text-sm truncate text-ink-gray-5">
                                    {option.description}
                                  </div>
                                )}
                              </div>
                            )}

                            {multiple && (
                              <div className="flex items-center justify-center w-4 h-4 shrink-0">
                                {isOptionSelected(option) ? (
                                  <Check className="w-4 h-4 shrink-0 text-ink-gray-7" />
                                ) : null}
                              </div>
                            )}
                          </div>
                        </BaseCombobox.Item>
                      ))}
                    </div>
                  ))
                )}
              </BaseCombobox.List>

              {showFooterSection && (
                <div className="p-1.5 border-t border-outline-gray-2">
                  {footerContent ?? (
                    <div className="flex items-center justify-end">
                      {!areAllOptionsSelected ? (
                        <Button label="Select All" onClick={selectAll} />
                      ) : (
                        <Button label="Clear All" onClick={clearAll} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </div>
  );
};

export default Autocomplete;
