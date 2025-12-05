export interface DatePickerChildrenProps {
  togglePopover: () => void;
  isOpen: boolean;
  displayValue: string;
}

export interface DatePickerProps {
  value?: string | string[];
  modelValue?: string | string[];
  placeholder?: string;
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
  onChange?: (value: string | string[]) => void;
  children?: (props: DatePickerChildrenProps) => React.ReactNode;
}

export interface DateTimePickerProps {
  value?: string;
  placeholder?: string;
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
  onChange?: (value: string[]) => void;
  children?: (props: DatePickerChildrenProps) => React.ReactNode;
}

export type DatePickerEmits = {
  (event: "update:modelValue", value: string): void;
  (event: "change", value: string): void;
};

export type DatePickerViewMode = "date" | "month" | "year";
