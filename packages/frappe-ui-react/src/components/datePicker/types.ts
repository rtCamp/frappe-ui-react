export interface DatePickerProps {
  value?: string | string[];
  modelValue?: string | string[];
  placeholder?: string;
  formatter?: (date: string) => string;
  readonly?: boolean;
  inputClass?: string | string[] | Record<string, boolean>;
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
  onChange?: (value: string | string[]) => void;
}

export type DatePickerEmits = {
  (event: "update:modelValue", value: string): void;
  (event: "change", value: string): void;
};
