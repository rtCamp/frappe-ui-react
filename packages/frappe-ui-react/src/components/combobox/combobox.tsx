import { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import {
  Combobox as ComboboxRoot,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Check } from "lucide-react";
import LoadingIndicator from "../loadingIndicator";
import type {
  ComboboxOption as ComboboxItem,
  ComboboxProps,
  GroupedOption,
  SimpleOption,
} from "./types";
import { cn } from "../../utils";

const getLabel = (option: SimpleOption) =>
  typeof option === "string" ? option : option.label;
const getValue = (option: SimpleOption) =>
  typeof option === "string" ? option : option.value;
const isDisabled = (option: SimpleOption) =>
  typeof option === "object" && !!option.disabled;
const getIcon = (option: SimpleOption) =>
  typeof option === "object" ? option.icon : undefined;
const isGroupedOption = (option: ComboboxItem): option is GroupedOption =>
  typeof option === "object" && "group" in option;

const flattenOptions = (options: ComboboxItem[]) => {
  const flat: SimpleOption[] = [];

  options.forEach((option) => {
    if (isGroupedOption(option)) {
      flat.push(...option.options);
      return;
    }

    flat.push(option);
  });

  return flat;
};

const filterOptions = (options: ComboboxItem[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return options;
  }

  return options
    .map((option) => {
      if (!isGroupedOption(option)) {
        return option;
      }

      return {
        ...option,
        options: option.options.filter((groupedOption) =>
          getLabel(groupedOption).toLowerCase().includes(normalizedQuery),
        ),
      };
    })
    .filter((option) =>
      isGroupedOption(option)
        ? option.options.length > 0
        : getLabel(option).toLowerCase().includes(normalizedQuery),
    );
};

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
  const [internalQuery, setInternalQuery] = useState("");
  const [settledRemoteOptions, setSettledRemoteOptions] =
    useState<ComboboxItem[]>(options);
  const isRemoteSearch = typeof onSearchChange === "function";
  const query = searchValue ?? internalQuery;

  useEffect(() => {
    if (!isRemoteSearch || loading) {
      return;
    }

    startTransition(() => {
      setSettledRemoteOptions(options);
    });
  }, [isRemoteSearch, loading, options]);

  const displayedOptions = useMemo(() => {
    if (!isRemoteSearch || !loading || options.length > 0) {
      return options;
    }

    return settledRemoteOptions;
  }, [isRemoteSearch, loading, options, settledRemoteOptions]);

  const allOptionsFlat = useMemo(
    () => flattenOptions(displayedOptions),
    [displayedOptions],
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

  const filteredOptions = useMemo(() => {
    if (isRemoteSearch) {
      return loading ? filterOptions(displayedOptions, query) : displayedOptions;
    }

    if (!query || (selectedOption && query === getLabel(selectedOption))) {
      return displayedOptions;
    }

    return filterOptions(displayedOptions, query);
  }, [displayedOptions, isRemoteSearch, loading, query, selectedOption]);

  const handleChange = useCallback(
    (val: string | null) => {
      const selected = val
        ? allOptionsFlat.find((opt) => getValue(opt) === val) || null
        : null;

      onChange?.(val, selected);

      if (isRemoteSearch) {
        updateQuery("");
        return;
      }

      updateQuery(selected ? getLabel(selected) : "");
    },
    [allOptionsFlat, isRemoteSearch, onChange, updateQuery]
  );

  const handleFocus = useCallback(() => {
    if (isRemoteSearch) {
      updateQuery("");
      return;
    }

    updateQuery(selectedOption ? getLabel(selectedOption) : "");
  }, [isRemoteSearch, selectedOption, updateQuery]);

  const resolvedEmptyMessage =
    emptyMessage ?? (query ? `No results found for "${query}"` : undefined);

  const showEmptyState =
    !loading && filteredOptions.length === 0 && Boolean(resolvedEmptyMessage);
  const showOptionsPanel = filteredOptions.length > 0 || showEmptyState;

  const hasSelectedIcon = Boolean(selectedOption && getIcon(selectedOption));

  const displayValue = useCallback(
    (val: string) => {
      if (!val) return "";
      const opt = allOptionsFlat.find((opt) => getValue(opt) === val);
      return opt ? getLabel(opt) : "";
    },
    [allOptionsFlat]
  );

  return (
    <ComboboxRoot
      value={value ?? ""}
      onChange={handleChange}
      disabled={disabled}
      immediate={openOnFocus}
    >
      <div className={cn("relative w-full", className)}>
        <div className="relative w-full">
          {selectedOption && getIcon(selectedOption) && (
            <span className="pointer-events-none absolute left-2 top-1/2 z-10 flex -translate-y-1/2 items-center">
              {getIcon(selectedOption)}
            </span>
          )}
          <ComboboxInput
            className={cn(
              "min-h-6 w-full rounded border border-surface-gray-2 bg-surface-gray-2 py-1 text-base text-ink-gray-8 transition-colors placeholder-ink-gray-4 outline-none focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3 disabled:bg-surface-gray-1 disabled:text-ink-gray-5",
              hasSelectedIcon ? "pl-8" : "pl-2",
              "pr-8",
              inputClassName,
            )}
            displayValue={displayValue}
            placeholder={placeholder}
            onChange={(e) => updateQuery(e.target.value)}
            onFocus={handleFocus}
            autoComplete="off"
          />
        </div>
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 text-ink-gray-4">
          {loading ? (
            <LoadingIndicator className="size-4 text-ink-gray-4" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </ComboboxButton>
        {showOptionsPanel && (
          <ComboboxOptions
            className={cn(
              "absolute z-100 mt-1 max-h-50 min-w-[160px] w-full overflow-y-auto rounded-lg border border-surface-gray-2 bg-surface-modal px-1.5 py-1.5 shadow-xl animate-fade-in [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:'none'] [-webkit-overflow-scrolling:'touch']",
            )}
          >
            {showEmptyState && (
              <div className="px-2 py-2 text-center text-base text-ink-gray-5">
                {resolvedEmptyMessage}
              </div>
            )}
            {filteredOptions.map((opt) =>
              isGroupedOption(opt) ? (
                <div key={opt.group}>
                  <div className="p-2 text-xs text-ink-gray-5 font-semibold">
                    {opt.group}
                  </div>
                  {opt.options.map((option) => (
                    <ComboboxOption
                      key={getValue(option)}
                      value={getValue(option)}
                      disabled={isDisabled(option)}
                      className={({ active, disabled: isOptionDisabled }) =>
                        cn(
                          "flex cursor-pointer items-center gap-2 truncate rounded px-2.5 py-1.5 text-base text-ink-gray-8",
                          isOptionDisabled && "opacity-50",
                          active && "bg-surface-gray-3",
                        )
                      }
                    >
                      {getIcon(option) && (
                        <span className="mr-1">{getIcon(option)}</span>
                      )}
                      <span className="flex-1">{getLabel(option)}</span>
                      {selectedOption &&
                        getValue(option) === getValue(selectedOption) && (
                          <span className="ml-2 text-ink-gray-5">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                    </ComboboxOption>
                  ))}
                </div>
              ) : (
                <ComboboxOption
                  key={getValue(opt)}
                  value={getValue(opt)}
                  disabled={isDisabled(opt)}
                  className={({ active, disabled: isOptionDisabled }) =>
                    cn(
                      "flex cursor-pointer items-center gap-2 truncate rounded px-2.5 py-1.5 text-base text-ink-gray-8",
                      isOptionDisabled && "opacity-50",
                      active && "bg-surface-gray-3",
                    )
                  }
                >
                  {getIcon(opt) && <span className="mr-1">{getIcon(opt)}</span>}
                  <span className="flex-1">{getLabel(opt)}</span>
                  {selectedOption && getValue(opt) === getValue(selectedOption) && (
                    <span className="ml-2 text-ink-gray-5">
                      <Check className="size-4" />
                    </span>
                  )}
                </ComboboxOption>
              )
            )}
          </ComboboxOptions>
        )}
      </div>
    </ComboboxRoot>
  );
};
