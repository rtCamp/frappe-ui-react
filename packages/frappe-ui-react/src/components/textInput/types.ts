import { InputHTMLAttributes, ReactNode } from "react";

export type TextInputSize = "sm" | "md" | "lg" | "xl";
export type TextInputVariant = "subtle" | "outline";
export type TextInputState = "success" | "warning" | "error";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix">
{
  prefix?: (size?: TextInputSize) => ReactNode;
  suffix?: (size?: TextInputSize) => ReactNode;
  size?: TextInputSize;
  variant?: TextInputVariant;
  state?: TextInputState;
  loading?: boolean;
  htmlId?: string;
  debounce?: number;
}
