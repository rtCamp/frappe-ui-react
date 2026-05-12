/**
 * External dependencies.
 */
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Combobox as BaseCombobox } from "@base-ui/react";

/**
 * Internal dependencies.
 */
import LoadingIndicator from "../loadingIndicator";
import type {
  ComboboxOption as ComboboxItem,
  ComboboxProps,
  SimpleOption,
} from "./types";
import {
  filterOptions,
  flattenOptions,
  getIcon,
  getLabel,
  getValue,
  isDisabled,
  isGroupedOption,
} from "./utils";
import { cn } from "../../utils";
import { Check, SmallDown } from "../../icons";

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  placeholder,
  disabled,
  openOnFocus = false,
  searchValue,
  onSearchChange,
  loading = false,
  emptyMessage,
  onChange,
  className,
  inputClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [internalQuery, setInternalQuery] = useState("");
  const [selectedLabelCache, setSelectedLabelCache] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [settledRemoteOptions, setSettledRemoteOptions] =
    useState<ComboboxItem[]>(options);
  const isSearchControlled = searchValue !== undefined;
  const query = isSearchControlled ? (searchValue ?? "") : internalQuery;

  useEffect(() => {
    if (!isSearchControlled || loading) {
      return;
    }

    // Defer settled-options updates so typing and focus interactions stay responsive.
    startTransition(() => {
      setSettledRemoteOptions(options);
    });
  }, [isSearchControlled, loading, options]);

  const displayedOptions = useMemo(() => {
    if (!isSearchControlled || !loading || options.length > 0) {
      return options;
    }

    return settledRemoteOptions;
  }, [isSearchControlled, loading, options, settledRemoteOptions]);

  const allOptionsFlat = useMemo(
    () => flattenOptions(displayedOptions),
    [displayedOptions]
  );

  const updateQuery = useCallback(
    (nextQuery: string) => {
      if (searchValue === undefined) {
        setInternalQuery(nextQuery);
      }
      onSearchChange?.(nextQuery);
    },
    [onSearchChange, searchValue]
  );

  const selectedOption = useMemo(() => {
    if (!value) return null;
    return allOptionsFlat.find((opt) => getValue(opt) === value) ?? null;
  }, [value, allOptionsFlat]);
  const selectedLabel = selectedOption
    ? getLabel(selectedOption)
    : value && selectedLabelCache?.value === value
      ? selectedLabelCache.label
      : "";
  const displayQuery = !query && selectedLabel ? selectedLabel : query;

  const filteredOptions = useMemo(() => {
    if (isSearchControlled) {
      return loading
        ? filterOptions(displayedOptions, query)
        : displayedOptions;
    }

    if (!query) {
      return displayedOptions;
    }

    return filterOptions(displayedOptions, query);
  }, [displayedOptions, isSearchControlled, loading, query]);

  const renderedOptionsFlat = flattenOptions(filteredOptions);

  const handleChange = useCallback(
    (selected: SimpleOption | null) => {
      const nextValue = selected ? getValue(selected) : null;
      const nextLabel = selected ? getLabel(selected) : "";

      setSelectedLabelCache(
        nextValue ? { value: nextValue, label: nextLabel } : null
      );

      onChange?.(nextValue, selected);

      updateQuery("");
    },
    [onChange, updateQuery]
  );

  const handleFocus = useCallback(() => {
    if (openOnFocus) {
      setOpen(true);
    }
  }, [openOnFocus]);

  const handleInputValueChange = useCallback(
    (nextQuery: string, details: { reason?: string }) => {
      if (details.reason === "item-press") {
        return;
      }

      updateQuery(nextQuery);
    },
    [updateQuery]
  );

  const resolvedEmptyMessage =
    emptyMessage ?? (query ? `No results found for "${query}"` : undefined);

  const showEmptyState =
    !loading && filteredOptions.length === 0 && Boolean(resolvedEmptyMessage);
  const showOptionsPanel = filteredOptions.length > 0 || showEmptyState;

  const hasSelectedIcon = Boolean(selectedOption && getIcon(selectedOption));

  const isSameOption = useCallback(
    (option: SimpleOption | null, candidate: SimpleOption | null) => {
      if (!option || !candidate) {
        return option === candidate;
      }

      return getValue(option) === getValue(candidate);
    },
    []
  );

  return (
    <BaseCombobox.Root
      items={renderedOptionsFlat}
      value={selectedOption}
      open={open}
      autoHighlight
      highlightItemOnHover
      itemToStringLabel={getLabel}
      inputValue={displayQuery}
      onOpenChange={setOpen}
      onInputValueChange={handleInputValueChange}
      onValueChange={handleChange}
      isItemEqualToValue={isSameOption}
      disabled={disabled}
    >
      <div className={cn("relative w-full", className)}>
        <div className="relative w-full">
          {selectedOption && getIcon(selectedOption) && (
            <span className="pointer-events-none absolute left-2 top-1/2 z-10 flex -translate-y-1/2 items-center">
              {getIcon(selectedOption)}
            </span>
          )}
          <BaseCombobox.Input
            className={cn(
              "min-h-6 w-full rounded border border-surface-gray-2 bg-surface-gray-2 py-1 text-base text-ink-gray-8 transition-colors placeholder-ink-gray-4 outline-none focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3 disabled:bg-surface-gray-1 disabled:text-ink-gray-5",
              hasSelectedIcon ? "pl-8" : "pl-2",
              loading ? "pr-12" : "pr-8",
              inputClassName
            )}
            placeholder={placeholder}
            onFocus={handleFocus}
            autoComplete="off"
          />
          <BaseCombobox.Trigger
            aria-label="Toggle options"
            className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2 text-ink-gray-4"
          >
            {loading && <LoadingIndicator className="size-4 text-ink-gray-4" />}
            <SmallDown className="size-4" aria-hidden="true" />
          </BaseCombobox.Trigger>
        </div>
        {showOptionsPanel && (
          <BaseCombobox.Portal>
            <BaseCombobox.Positioner
              sideOffset={4}
              align="start"
              className="z-100"
            >
              <BaseCombobox.Popup
                className={cn(
                  "min-w-[160px] w-(--anchor-width) rounded-lg border border-surface-gray-2 bg-surface-modal px-1.5 py-1.5 shadow-xl animate-fade-in"
                )}
                aria-label="Options"
              >
                {showEmptyState && (
                  <div className="w-full wrap-break-word px-2 py-2 text-center text-base text-ink-gray-5">
                    {resolvedEmptyMessage}
                  </div>
                )}
                <BaseCombobox.List className="max-h-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:'none'] [-webkit-overflow-scrolling:'touch']">
                  {filteredOptions.map((opt) =>
                    isGroupedOption(opt) ? (
                      <div key={opt.group}>
                        <div className="p-2 text-xs font-semibold text-ink-gray-5">
                          {opt.group}
                        </div>
                        {opt.options.map((option) => (
                          <BaseCombobox.Item
                            key={getValue(option)}
                            value={option}
                            disabled={isDisabled(option)}
                            className={cn(
                              "relative flex cursor-pointer select-none items-center gap-2 truncate rounded px-2.5 py-1.5 pr-8 text-base text-ink-gray-8 focus:outline-none",
                              "data-disabled:pointer-events-none data-disabled:opacity-50",
                              "data-highlighted:bg-surface-gray-3 data-highlighted:outline-none",
                              "data-selected:bg-surface-gray-3"
                            )}
                          >
                            {getIcon(option) && (
                              <span className="mr-1">{getIcon(option)}</span>
                            )}
                            <span className="flex-1">{getLabel(option)}</span>
                            <BaseCombobox.ItemIndicator className="absolute right-2 inline-flex items-center justify-center text-ink-gray-5">
                              <Check className="size-4" />
                            </BaseCombobox.ItemIndicator>
                          </BaseCombobox.Item>
                        ))}
                      </div>
                    ) : (
                      <BaseCombobox.Item
                        key={getValue(opt)}
                        value={opt}
                        disabled={isDisabled(opt)}
                        className={cn(
                          "relative flex cursor-pointer select-none items-center gap-2 truncate rounded px-2.5 py-1.5 pr-8 text-base text-ink-gray-8 focus:outline-none",
                          "data-disabled:pointer-events-none data-disabled:opacity-50",
                          "data-highlighted:bg-surface-gray-3 data-highlighted:outline-none",
                          "data-selected:bg-surface-gray-3"
                        )}
                      >
                        {getIcon(opt) && (
                          <span className="mr-1">{getIcon(opt)}</span>
                        )}
                        <span className="flex-1">{getLabel(opt)}</span>
                        <BaseCombobox.ItemIndicator className="absolute right-2 inline-flex items-center justify-center text-ink-gray-5">
                          <Check className="size-4" />
                        </BaseCombobox.ItemIndicator>
                      </BaseCombobox.Item>
                    )
                  )}
                </BaseCombobox.List>
              </BaseCombobox.Popup>
            </BaseCombobox.Positioner>
          </BaseCombobox.Portal>
        )}
      </div>
    </BaseCombobox.Root>
  );
};
