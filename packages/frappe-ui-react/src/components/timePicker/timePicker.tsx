/**
 * External dependencies.
 */
import React from "react";

/**
 * Internal dependencies.
 */
import Popover from "../popover/popover";
import TextInput from "../textInput/textInput";
import FeatherIcon from "../featherIcon";
import type { TimePickerProps, TimePickerOption } from "./types";
import { useTimePicker } from "./useTimePicker";

const TimePicker: React.FC<TimePickerProps> = ({
  value = "",
  onChange,
  onInputInvalid,
  onInvalidChange,
  onOpen,
  onClose,
  interval = 15,
  options = [],
  placement = "bottom-start",
  placeholder = "Select time",
  variant = "subtle",
  allowCustom = true,
  autoClose = true,
  use12Hour = true,
  disabled = false,
  scrollMode = "center",
  minTime = "",
  maxTime = "",
  prefix,
  suffix,
}) => {
  const {
    showOptions,
    setShowOptions,
    displayValue,
    displayedOptions,
    isTyping,
    selectedAndNearest,
    highlightIndex,
    panelRef,
    inputRef,
    handleArrowDown,
    handleArrowUp,
    handleEnter,
    handleClickInput,
    handleFocus,
    handleBlur,
    handleEscape,
    handleDisplayValueChange,
    handleMouseEnter,
    select,
    optionId,
  } = useTimePicker({
    value,
    onChange,
    onInputInvalid,
    onInvalidChange,
    onOpen,
    onClose,
    interval,
    options,
    allowCustom,
    autoClose,
    use12Hour,
    scrollMode,
    minTime,
    maxTime,
  });

  const getButtonClasses = (opt: TimePickerOption, idx: number): string => {
    if (idx === highlightIndex) return "bg-surface-gray-3 text-ink-gray-8";
    const { selected, nearest } = selectedAndNearest;
    if (isTyping && !selected) {
      if (nearest && nearest.value === opt.value)
        return "text-ink-gray-7 italic bg-surface-gray-2";
      return "text-ink-gray-6 hover:bg-surface-gray-2 hover:text-ink-gray-8";
    }
    if (selected && selected.value === opt.value)
      return "bg-surface-gray-3 text-ink-gray-8";
    if (nearest && nearest.value === opt.value)
      return "text-ink-gray-7 italic bg-surface-gray-2";
    return "text-ink-gray-6 hover:bg-surface-gray-2 hover:text-ink-gray-8";
  };

  return (
    <Popover
      show={showOptions && !disabled}
      onUpdateShow={(show) => !disabled && setShowOptions(show)}
      placement={placement}
      target={({ togglePopover, isOpen }) => (
        <TextInput
          ref={inputRef}
          value={displayValue}
          onChange={handleDisplayValueChange}
          variant={variant}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={!allowCustom}
          onFocus={handleFocus}
          onClick={() => !disabled && handleClickInput(isOpen, togglePopover)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleEnter(e);
            else if (e.key === "Escape") handleEscape(e);
            else if (e.key === "ArrowDown")
              handleArrowDown(e, togglePopover, isOpen);
            else if (e.key === "ArrowUp")
              handleArrowUp(e, togglePopover, isOpen);
          }}
          onBlur={handleBlur}
          prefix={prefix}
          suffix={
            suffix
              ? suffix
              : () => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FeatherIcon
                      name="chevron-down"
                      className="h-4 w-4 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        togglePopover();
                      }}
                    />
                  </div>
                )
          }
        />
      )}
      body={({ isOpen }) => (
        <div
          ref={panelRef}
          style={{ display: isOpen ? "block" : "none" }}
          className="mt-2 max-h-48 w-44 overflow-y-auto rounded-lg bg-surface-modal p-1 text-base shadow-2xl ring-1 ring-black/5 focus:outline-none"
          role="listbox"
        >
          {displayedOptions.map((opt, idx) => (
            <button
              key={opt.value}
              data-value={opt.value}
              data-index={idx}
              type="button"
              className={`group flex h-7 w-full items-center rounded px-2 text-left ${getButtonClasses(
                opt,
                idx
              )}`}
              onClick={() => select(opt.value)}
              onMouseEnter={() => handleMouseEnter(idx)}
              role="option"
              id={optionId(idx)}
            >
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    />
  );
};

export default TimePicker;
