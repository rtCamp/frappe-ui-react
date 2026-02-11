import type { Placement } from "@popperjs/core";

export interface MonthPickerProps {
  /** Selected month value in 'Month Year' format (e.g., 'January 2026') */
  value?: string;
  /** Placeholder text for the MonthPicker button */
  placeholder?: string;
  /** CSS class names to apply to the button */
  className?: string;
  /** Popover placement relative to the target */
  placement?: Placement;
  /** Callback fired when the month value changes */
  onChange?: (value: string) => void;
}
