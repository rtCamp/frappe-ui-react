import type { ComponentType } from "react";
import type { Placement } from "@popperjs/core";

export interface MonthPickerProps {
  /** Selected month value in 'Month Year' format (e.g., 'January 2026') */
  value?: string;
  /** Placeholder text for the MonthPicker button */
  placeholder?: string;
  /** CSS class names to apply to the button */
  className?: string;
  /** Icon rendered at the trigger's right edge. Defaults to a calendar icon. */
  inputIcon?: ComponentType<{ className?: string }>;
  /** Popover placement relative to the target */
  placement?: Placement;
  /** Callback fired when the month value changes */
  onChange?: (value: string) => void;
}
