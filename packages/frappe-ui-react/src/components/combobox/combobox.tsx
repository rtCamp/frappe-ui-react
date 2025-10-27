import { useCallback, useMemo, useState } from "react";
import {
  Combobox as ComboboxRoot,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import type { ComboboxProps, SimpleOption } from "./types";

// Utility for display
const getLabel = (option: SimpleOption) =>
  typeof option === "string" ? option : option.label;
const getValue = (option: SimpleOption) =>
  typeof option === "string" ? option : option.value;
const isDisabled = (option: SimpleOption) =>
  typeof option === "object" && !!option.disabled;
const getIcon = (option: SimpleOption) =>
  typeof option === "object" ? option.icon : undefined;

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  placeholder,
  disabled,
  onChange,
  className,
}) => {
  const allOptionsFlat: SimpleOption[] = useMemo(() => {
    const flat: SimpleOption[] = [];
    options.forEach((opt) => {
      if (typeof opt === "object" && "group" in opt) {
        flat.push(...opt.options);
      } else {
        flat.push(opt as SimpleOption);
      }
    });
    return flat;
  }, [options]);

  // For filtering/search
  const [query, setQuery] = useState("");

  const selectedOption = useMemo(() => {
    if (!value) return null;

    const opt = allOptionsFlat.find((opt) => getValue(opt) === value) ?? null;

    setQuery(opt ? getLabel(opt) : "");
    return opt;
  }, [value, allOptionsFlat]);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    const match = (opt: SimpleOption) =>
      getLabel(opt).toLowerCase().includes(query.toLowerCase());
    return options
      .map((opt) =>
        typeof opt === "object" && "group" in opt
          ? {
              ...opt,
              options: opt.options.filter(match),
            }
          : opt
      )
      .filter((opt) =>
        typeof opt === "string"
          ? match(opt)
          : "group" in opt
          ? opt.options.length
          : match(opt)
      );
  }, [options, query]);

  const handleChange = useCallback(
    (val: string | null) => {
      const selected = val
        ? allOptionsFlat.find((opt) => getValue(opt) === val) || null
        : null;

      onChange?.(val, selected);
      setQuery(val || "");
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

  return (
    <ComboboxRoot
      value={value ?? ""}
      onChange={handleChange}
      disabled={disabled}
    >
      <div className={`relative w-full ${className ?? ""}`}>
        <div className="relative w-full">
          {/* Show icon in input if selected option has icon */}
          {selectedOption && getIcon(selectedOption) && (
            <span className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
              {getIcon(selectedOption)}
            </span>
          )}
          <ComboboxInput
            className={`
              w-full bg-surface-gray-2 border border-surface-gray-2 rounded
              ${selectedOption && getIcon(selectedOption) ? "pl-8" : "pl-2"}
              pr-2 py-1 min-h-[25px] text-base
              placeholder-ink-gray-4 text-ink-gray-8
              outline-none focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3
              transition-colors
              disabled:bg-surface-gray-1 disabled:text-ink-gray-5
            `}
            displayValue={displayValue}
            value={query}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 text-ink-gray-4">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M4 6l4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </ComboboxButton>
        <ComboboxOptions
          className={`
            absolute z-[100] mt-1 w-full bg-surface-white border border-surface-gray-2 rounded shadow-xl min-w-[160px]
            animate-fade-in
          `}
        >
          {filteredOptions.length === 0 && (
            <div className="px-2 py-2 text-ink-gray-5 text-sm">
              No results found
            </div>
          )}
          {filteredOptions.map((opt) =>
            typeof opt === "object" && "group" in opt ? (
              <div key={opt.group}>
                <div className="p-2 text-xs text-ink-gray-5 font-semibold">
                  {opt.group}
                </div>
                {opt.options.map((option) => (
                  <ComboboxOption
                    key={getValue(option)}
                    value={getValue(option)}
                    disabled={isDisabled(option)}
                    className={({ active, selected, disabled }) =>
                      `
                        text-ink-gray-8 flex items-center gap-2 px-2 py-1 text-base cursor-pointer truncate 
                        ${disabled ? "opacity-50" : ""}
                        ${active ? "bg-surface-gray-3" : ""}
                        ${selected ? "font-bold" : ""}
                      `
                    }
                  >
                    {getIcon(option) && (
                      <span className="mr-1">{getIcon(option)}</span>
                    )}
                    <span className="flex-1">{getLabel(option)}</span>
                    {selectedOption &&
                      getValue(option) === getValue(selectedOption) && (
                        <span className="ml-2 text-ink-gray-5">
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <path
                              d="M4 8l3 3 5-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                      )}
                  </ComboboxOption>
                ))}
              </div>
            ) : (
              <ComboboxOption
                key={getValue(opt as SimpleOption)}
                value={getValue(opt as SimpleOption)}
                disabled={isDisabled(opt as SimpleOption)}
                className={({ active, selected, disabled }) =>
                  `
                    text-ink-gray-8 flex items-center gap-2 px-2 py-1 text-base cursor-pointer truncate
                    ${disabled ? "opacity-50" : ""}
                    ${active ? "bg-surface-gray-3" : ""}
                    ${selected ? "font-bold" : ""}
                  `
                }
              >
                {getIcon(opt as SimpleOption) && (
                  <span className="mr-1">{getIcon(opt as SimpleOption)}</span>
                )}
                <span className="flex-1">{getLabel(opt as SimpleOption)}</span>
                {selectedOption &&
                  getValue(opt as SimpleOption) ===
                    getValue(selectedOption) && (
                    <span className="ml-2 text-ink-gray-5">
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path
                          d="M4 8l3 3 5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  )}
              </ComboboxOption>
            )
          )}
        </ComboboxOptions>
      </div>
    </ComboboxRoot>
  );
};
