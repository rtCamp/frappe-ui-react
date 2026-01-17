import type { ReactNode } from "react";
import type { Placement } from "@popperjs/core";

export interface TimePickerOption {
  value: string;
  label: string;
}

export interface ParsedTimeValid {
  valid: true;
  hh24: string;
  mm: string;
  ss?: string;
  total: number;
}

export interface ParsedTimeInvalid {
  valid: false;
}

export type ParsedTime = ParsedTimeValid | ParsedTimeInvalid;

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  onInputInvalid?: (input: string) => void;
  onInvalidChange?: (invalid: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  interval?: number;
  options?: Array<{ value: string; label?: string }>;
  placement?: Placement;
  placeholder?: string;
  variant?: "outline" | "subtle";
  allowCustom?: boolean;
  autoClose?: boolean;
  use12Hour?: boolean;
  disabled?: boolean;
  scrollMode?: "center" | "start" | "nearest";
  minTime?: string;
  maxTime?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffix?: (args?: any) => ReactNode;
}
