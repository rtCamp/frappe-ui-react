import { useCallback, useMemo, useState, useRef } from "react";
import {
  Combobox as ComboboxRoot,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import type {
  FilterSelectProps,
  FilterSelectOption,
  FilterOptionType,
  FilterGroupedOption,
} from "./types";

const isGroupedOption = (opt: FilterOptionType): opt is FilterGroupedOption => {
  return typeof opt === "object" && "group" in opt;
};

const getLabel = (option: FilterSelectOption) => option.label;
const getValue = (option: FilterSelectOption) => option.value;
const isDisabled = (option: FilterSelectOption) => !!option.disabled;
const getIcon = (option: FilterSelectOption) => option.icon;

export const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  value,
  placeholder = "Select...",
  disabled,
  onChange,
  minWidth = 80,
  className,
}) => {
  const allOptionsFlat: FilterSelectOption[] = useMemo(() => {
    const flat: FilterSelectOption[] = [];
    options.forEach((opt) => {
      if (isGroupedOption(opt)) {
        flat.push(...opt.options);
      } else {
        flat.push(opt);
      }
    });
    return flat;
  }, [options]);

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(() => {
    if (!value) return null;
    return allOptionsFlat.find((opt) => getValue(opt) === value) ?? null;
  }, [value, allOptionsFlat]);

  const filteredOptions = useMemo(() => {
    if (!query || (selectedOption && query === getLabel(selectedOption))) {
      return options;
    }

    return options
      .map((opt) =>
        isGroupedOption(opt)
          ? {
              ...opt,
              options: opt.options.filter((o) =>
                getLabel(o).toLowerCase().includes(query.toLowerCase())
              ),
            }
          : opt
      )
      .filter((opt) =>
        isGroupedOption(opt)
          ? opt.options.length > 0
          : getLabel(opt).toLowerCase().includes(query.toLowerCase())
      );
  }, [options, query, selectedOption]);

  const handleChange = useCallback(
    (val: string | null) => {
      const selected = val
        ? allOptionsFlat.find((opt) => getValue(opt) === val) || null
        : null;

      onChange?.(val);
      setQuery(selected ? getLabel(selected) : "");
    },
    [allOptionsFlat, onChange]
  );

  const displayValue = useCallback(
    (val: string) => {
      if (!val) return "";
      const opt = allOptionsFlat.find((opt) => getValue(opt) === val);
      return opt ? getLabel(opt) : "";
    },
    [allOptionsFlat]
  );

  // Calculate min width based on selected option if not specified
  const style = useMemo(() => {
    return {
      minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth,
    };
  }, [minWidth]);

  return (
    <ComboboxRoot
      value={value ?? ""}
      onChange={handleChange}
      disabled={disabled}
    >
      <div className={`relative ${className ?? ""}`} style={style}>
        <div className="relative w-full">
          {selectedOption && getIcon(selectedOption) && (
            <span className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
              {getIcon(selectedOption)}
            </span>
          )}
          <ComboboxInput
            ref={inputRef}
            className={`
              w-full bg-surface-gray-2 border-none rounded
              ${selectedOption && getIcon(selectedOption) ? "pl-8" : "pl-2"}
              pr-6 py-1 min-h-7 text-base
              placeholder-ink-gray-4 text-ink-gray-8
              outline-none focus:ring-2 focus:ring-outline-gray-3
              transition-colors cursor-pointer
              disabled:bg-surface-gray-1 disabled:text-ink-gray-5
            `}
            displayValue={displayValue}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={(e) => {
              setQuery(selectedOption ? getLabel(selectedOption) : "");
              e.target.select();
            }}
            autoComplete="off"
          />
        </div>
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-1.5 text-ink-gray-4">
          <ChevronDown className="h-4 w-4" />
        </ComboboxButton>
        <ComboboxOptions
          className={`
            absolute z-100 mt-1 px-1.5 py-1.5 bg-surface-modal border border-outline-gray-1 
            rounded-lg shadow-xl min-w-40 max-h-60 animate-fade-in overflow-y-auto 
            [&::-webkit-scrollbar]:hidden [scrollbar-width:none]
          `}
        >
          {filteredOptions.length === 0 && (
            <div className="px-2 py-2 text-ink-gray-5 text-base text-center">
              No results
            </div>
          )}
          {filteredOptions.map((opt, idx) =>
            isGroupedOption(opt) ? (
              <div key={opt.group || idx}>
                {opt.group && (
                  <div className="px-2 py-1.5 text-xs font-medium text-ink-gray-5 uppercase tracking-wide">
                    {opt.group}
                  </div>
                )}
                {opt.options.map((item) => (
                  <ComboboxOption
                    key={getValue(item)}
                    value={getValue(item)}
                    disabled={isDisabled(item)}
                    className={({ focus, selected }) =>
                      `flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-base
                      ${focus ? "bg-surface-gray-3" : ""}
                      ${selected ? "text-ink-gray-8 font-medium" : "text-ink-gray-7"}
                      ${isDisabled(item) ? "opacity-50 cursor-not-allowed" : ""}
                    `
                    }
                  >
                    {({ selected }) => (
                      <>
                        {getIcon(item) && (
                          <span className="shrink-0">{getIcon(item)}</span>
                        )}
                        <span className="flex-1 truncate">
                          {getLabel(item)}
                        </span>
                        {selected && (
                          <Check className="h-4 w-4 text-ink-gray-7 shrink-0" />
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))}
              </div>
            ) : (
              <ComboboxOption
                key={getValue(opt)}
                value={getValue(opt)}
                disabled={isDisabled(opt)}
                className={({ focus, selected }) =>
                  `flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-base
                  ${focus ? "bg-surface-gray-3" : ""}
                  ${selected ? "text-ink-gray-8 font-medium" : "text-ink-gray-7"}
                  ${isDisabled(opt) ? "opacity-50 cursor-not-allowed" : ""}
                `
                }
              >
                {({ selected }) => (
                  <>
                    {getIcon(opt) && (
                      <span className="shrink-0">{getIcon(opt)}</span>
                    )}
                    <span className="flex-1 truncate">{getLabel(opt)}</span>
                    {selected && (
                      <Check className="h-4 w-4 text-ink-gray-7 shrink-0" />
                    )}
                  </>
                )}
              </ComboboxOption>
            )
          )}
        </ComboboxOptions>
      </div>
    </ComboboxRoot>
  );
};

export default FilterSelect;
