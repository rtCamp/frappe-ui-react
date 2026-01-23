import { InputHTMLAttributes, ReactNode } from "react";
export type TextInputSize = "sm" | "md" | "lg" | "xl";
export type TextInputVariant = "subtle" | "outline";
export type TextInputState = "success" | "warning" | "error";

export interface TextInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "suffix"
  > {
  size?: TextInputSize;
  variant?: TextInputVariant;
  state?: TextInputState;
  placeholder?: string;
  disabled?: boolean;
  htmlId?: string;
  value?: string | number;
  debounce?: number;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: (args?: TextInputSize) => ReactNode;
  suffix?: (args?: TextInputSize) => ReactNode;
  className?: string;
  loading?: boolean;
}
