import type { ComponentProps, KeyboardEventHandler } from "react";
import { Popover } from "@base-ui/react/popover";
import type { useRender } from "@base-ui/react/use-render";

type PopoverSideOffset = ComponentProps<
  typeof Popover.Positioner
>["sideOffset"];

export interface DatePickerChildrenProps {
  isOpen: boolean;
  displayValue: string;
  disabled?: boolean;
  openPicker: () => void;
  closePicker: () => void;
  togglePicker: () => void;
  onTriggerKeyDown: KeyboardEventHandler<HTMLElement>;
}

export interface DatePickerProps {
  value?: string | string[];
  modelValue?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  sideOffset?: PopoverSideOffset;
  formatter?: (date: string) => string;
  readonly?: boolean;
  inputClass?: string;
  variant?: "subtle" | "outline" | "ghost";
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end";
  label?: string;
  clearable?: boolean;
  footer?: DatePickerFooterRender;
  onChange?: (value: string | string[]) => void;
  children?: (props: DatePickerChildrenProps) => React.ReactNode;
}

export type DatePickerFooterState = {
  value: string;
  // Apply a yyyy-mm-dd value (syncs the calendar and fires onChange).
  setValue: (value: string) => void;
  // Reset the current selection and close the popup.
  clear: () => void;
  // Close the popup.
  close: () => void;
};

export type DatePickerFooterRender =
  useRender.RenderProp<DatePickerFooterState>;

export interface DateTimePickerProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  formatter?: (date: string) => string;
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end";
  label?: string;
  clearable?: boolean;
  onChange?: (value: string) => void;
  children?: (props: DatePickerChildrenProps) => React.ReactNode;
}

export interface DateRangePickerProps {
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  sideOffset?: PopoverSideOffset;
  formatter?: (from: string, to: string) => string;
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end";
  label?: string;
  footer?: (props: DateRangeFooterProps) => React.ReactNode;
  onChange?: (value: string[]) => void;
  children?: (props: DatePickerChildrenProps) => React.ReactNode;
}

export interface DateRangeFooterProps {
  from: string;
  to: string;
  // Apply a [from, to] selection (syncs the calendar and fires onChange).
  setRange: (from: string, to: string) => void;
  // Reset the current selection (keeps the popup open).
  clear: () => void;
  // Close the popup.
  close: () => void;
}

export type DatePickerEmits = {
  (event: "update:modelValue", value: string): void;
  (event: "change", value: string): void;
};

export type DatePickerViewMode = "date" | "month" | "year";

// Popover placement types
export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";
