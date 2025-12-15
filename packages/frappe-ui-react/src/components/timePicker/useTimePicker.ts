import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { Option, TimePickerProps } from "./types";
import {
  findNearestIndex,
  formatDisplay,
  formatDisplayInitial,
  minutesFromHHMM,
  normalize24,
  normalize24Initial,
  parseFlexibleTimeHelper,
} from "./utils";

export function useTimePicker({
  value = "",
  onChange,
  onInputInvalid,
  onInvalidChange,
  onOpen,
  onClose,
  interval = 15,
  options = [],
  allowCustom = true,
  autoClose = true,
  use12Hour = true,
  scrollMode = "center",
  minTime = "",
  maxTime = "",
}: Omit<TimePickerProps, "variant" | "placement" | "disabled" | "placeholder" | "suffix" | "prefix">) {
  const [internalValue, setInternalValue] = useState(normalize24Initial(value));
  const [displayValue, setDisplayValue] = useState(
    formatDisplayInitial(normalize24Initial(value), use12Hour)
  );
  const [showOptions, setShowOptions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [invalidState, setInvalidState] = useState(false);
  const [hasSelectedOnFirstClick, setHasSelectedOnFirstClick] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navUpdatingRef = useRef(false);
  const initHighlightRef = useRef<() => void>(() => {});
  const scheduleScrollRef = useRef<(targetIndex?: number) => void>(() => {});
  const uid = useMemo(() => Math.random().toString(36).slice(2, 9), []);

  const minMinutes = useMemo(() => minutesFromHHMM(minTime), [minTime]);
  const maxMinutes = useMemo(() => minutesFromHHMM(maxTime), [maxTime]);

  const getBaseTime = useCallback((time: string): string => {
    return time.length === 8 ? time.slice(0, 5) : time;
  }, []);

  const preserveSeconds = useCallback((newVal: string, currentVal: string): string => {
    return currentVal.length === 8 && newVal.length === 5
      ? `${newVal}${currentVal.slice(5)}`
      : newVal;
  }, []);

  const selectInputText = useCallback(() => {
    queueMicrotask(() => {
      inputRef.current?.select();
      setHasSelectedOnFirstClick(true);
    });
  }, []);

  const displayedOptions = useMemo<Option[]>(() => {
    if (options.length) {
      return options.map((o) => {
        const val = normalize24(o.value);
        return {
          value: val,
          label: o.label || formatDisplay(val, use12Hour),
        };
      });
    }

    const out: Option[] = [];
    for (let m = 0; m < 1440; m += interval) {
      if (minMinutes != null && m < minMinutes) continue;
      if (maxMinutes != null && m > maxMinutes) continue;
      const hh = Math.floor(m / 60)
        .toString()
        .padStart(2, "0");
      const mm = (m % 60).toString().padStart(2, "0");
      const val = `${hh}:${mm}`;
      out.push({
        value: val,
        label: formatDisplay(val, use12Hour),
      });
    }
    return out;
  }, [options, interval, minMinutes, maxMinutes, use12Hour]);

  const isOutOfRange = useCallback(
    (totalMinutes: number): boolean => {
      if (minMinutes != null && totalMinutes < minMinutes) return true;
      if (maxMinutes != null && totalMinutes > maxMinutes) return true;
      return false;
    },
    [minMinutes, maxMinutes]
  );

  const updateInvalidState = useCallback(
    (val: boolean) => {
      if (invalidState !== val) {
        setInvalidState(val);
        onInvalidChange?.(val);
      }
    },
    [invalidState, onInvalidChange]
  );

  const applyValue = useCallback(
    (val24: string, commit = false) => {
      setInternalValue(val24);
      setDisplayValue(formatDisplay(val24, use12Hour));
      if (commit || !isFocused) {
        onChange?.(val24);
      }
      updateInvalidState(false);
    },
    [use12Hour, isFocused, onChange, updateInvalidState]
  );

  const commitInput = useCallback(() => {
    const raw = displayValue;
    
    if (!raw) {
      setInternalValue("");
      if (!isFocused) onChange?.("");
      updateInvalidState(false);
      return;
    }

    const parsed = parseFlexibleTimeHelper(raw);
    if (!parsed.valid || isOutOfRange(parsed.total)) {
      onInputInvalid?.(raw);
      updateInvalidState(true);
      return;
    }

    const normalized = normalize24(raw);
    const isInOptions = displayedOptions.some((o) => o.value === getBaseTime(normalized));

    if (!allowCustom && !isInOptions) {
      const nearestIdx = findNearestIndex(parsed.total, displayedOptions);
      if (nearestIdx > -1) {
        const nearestVal = displayedOptions[nearestIdx].value;
        applyValue(preserveSeconds(nearestVal, normalized), true);
        return;
      }
    }
    
    applyValue(normalized, true);
  }, [
    displayValue,
    isFocused,
    onChange,
    updateInvalidState,
    isOutOfRange,
    onInputInvalid,
    allowCustom,
    displayedOptions,
    applyValue,
    getBaseTime,
    preserveSeconds,
  ]);

  const select = useCallback(
    (val: string) => {
      applyValue(val, true);
      if (autoClose) setShowOptions(false);
    },
    [applyValue, autoClose]
  );

  const selectedAndNearest = useMemo(() => {
    const list = displayedOptions;
    if (!list.length) return { selected: null, nearest: null };

    const candidate = isTyping ? normalize24(displayValue) : internalValue;
    if (!candidate) return { selected: null, nearest: null };

    const candidateBase = getBaseTime(candidate);
    const selected = list.find((o) => o.value === candidateBase) || null;
    if (selected) return { selected, nearest: null };

    const parsed = parseFlexibleTimeHelper(candidate);
    if (!parsed.valid) return { selected: null, nearest: null };

    const idx = findNearestIndex(parsed.total, list);
    return { selected: null, nearest: idx > -1 ? list[idx] : null };
  }, [displayedOptions, displayValue, isTyping, internalValue, getBaseTime]);

  const initHighlight = useCallback(() => {
    const { selected, nearest } = selectedAndNearest;
    const target = selected || nearest;
    if (!target) {
      setHighlightIndex(-1);
      return;
    }
    const idx = displayedOptions.findIndex((o) => o.value === target.value);
    setHighlightIndex(idx);
  }, [selectedAndNearest, displayedOptions]);

  useEffect(() => {
    initHighlightRef.current = initHighlight;
  }, [initHighlight]);

  const scheduleScroll = useCallback((targetIndex?: number) => {
    requestAnimationFrame(() => {
      if (!panelRef.current || !showOptions) return;
      
      const indexToUse = targetIndex ?? highlightIndex;
      let targetEl: HTMLElement | null = null;
      
      if (indexToUse > -1) {
        targetEl = panelRef.current.querySelector(`[data-index="${indexToUse}"]`);
      } else {
        const target = selectedAndNearest.selected || selectedAndNearest.nearest;
        if (target) {
          targetEl = panelRef.current.querySelector(`[data-value="${target.value}"]`);
        }
      }
      
      targetEl?.scrollIntoView({ block: scrollMode });
    });
  }, [highlightIndex, selectedAndNearest, showOptions, scrollMode]);

  useEffect(() => {
    scheduleScrollRef.current = scheduleScroll;
  }, [scheduleScroll]);

  const moveHighlight = useCallback(
    (delta: number) => {
      if (!displayedOptions.length) return;
      
      if (highlightIndex === -1) {
        initHighlight();
        return;
      }
      
      const newIndex = (highlightIndex + delta + displayedOptions.length) % displayedOptions.length;
      setHighlightIndex(newIndex);
      
      const opt = displayedOptions[newIndex];
      if (opt) {
        navUpdatingRef.current = true;
        const val = preserveSeconds(opt.value, internalValue);
        applyValue(val, false);
        onChange?.(val);
        queueMicrotask(() => {
          navUpdatingRef.current = false;
        });
      }
      
      setIsTyping(false);
      scheduleScroll(newIndex);
    },
    [displayedOptions, highlightIndex, internalValue, applyValue, initHighlight, scheduleScroll, onChange, preserveSeconds]
  );

  const handleArrowDown = useCallback(
    (e: React.KeyboardEvent, togglePopover: () => void, isOpen?: boolean) => {
      e.preventDefault();
      if (!isOpen) {
        togglePopover();
      } else {
        moveHighlight(1);
      }
    },
    [moveHighlight]
  );

  const handleArrowUp = useCallback(
    (e: React.KeyboardEvent, togglePopover: () => void, isOpen?: boolean) => {
      e.preventDefault();
      if (!isOpen) {
        togglePopover();
      } else {
        moveHighlight(-1);
      }
    },
    [moveHighlight]
  );

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      e.preventDefault();
      
      if (!showOptions) {
        commitInput();
        inputRef.current?.blur();
        return;
      }
      
      const normalized = normalize24(displayValue);
      const isInOptions = normalized
        ? displayedOptions.some((o) => o.value === getBaseTime(normalized))
        : false;
      
      const shouldCommit = normalized && (!isInOptions || isTyping);
      const hasHighlight = highlightIndex > -1 && displayedOptions[highlightIndex];
      
      if (shouldCommit) {
        commitInput();
        if (autoClose) setShowOptions(false);
      } else if (hasHighlight) {
        select(displayedOptions[highlightIndex].value);
      } else {
        commitInput();
        if (autoClose) setShowOptions(false);
      }
      
      inputRef.current?.blur();
    },
    [showOptions, commitInput, displayValue, displayedOptions, isTyping, autoClose, highlightIndex, select, getBaseTime]
  );

  const handleClickInput = useCallback(
    (isOpen: boolean | undefined, togglePopover: () => void) => {
      if (!isOpen) togglePopover();
      if (allowCustom) selectInputText();
    },
    [allowCustom, selectInputText]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (allowCustom && !hasSelectedOnFirstClick) selectInputText();
  }, [allowCustom, hasSelectedOnFirstClick, selectInputText]);

  const handleBlur = useCallback(() => {
    if (showOptions) {
      setIsFocused(false);
      return;
    }
    commitInput();
    setIsFocused(false);
  }, [showOptions, commitInput]);

  const handleEscape = useCallback((e: React.KeyboardEvent) => {
    e.preventDefault();
    setShowOptions(false);
    inputRef.current?.blur();
  }, []);

  const handleDisplayValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setDisplayValue(newValue);
      
      if (navUpdatingRef.current) return;
      
      if (showOptions) scheduleScroll();
      setIsTyping(true);
      setHighlightIndex(-1);
    },
    [showOptions, scheduleScroll]
  );

  const handleMouseEnter = useCallback((idx: number) => {
    setHighlightIndex(idx);
  }, []);

  useEffect(() => {
    const normalized = normalize24(value);
    if (navUpdatingRef.current) {
      return;
    }
    if (normalized !== internalValue) {
      setInternalValue(normalized);
      setDisplayValue(formatDisplay(normalized, use12Hour));
    }
  }, [value, internalValue, use12Hour]);

  useEffect(() => {
    if (showOptions) {
      onOpen?.();
      initHighlightRef.current();
      scheduleScrollRef.current();
    } else {
      onClose?.();
    }
  }, [showOptions, onOpen, onClose]);

  const optionId = (idx: number): string => `tp-${uid}-${idx}`;

  return {
    showOptions,
    setShowOptions,
    displayValue,
    internalValue,
    highlightIndex,
    setHighlightIndex,
    isTyping,
    panelRef,
    inputRef,
    displayedOptions,
    selectedAndNearest,
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
  };
}
