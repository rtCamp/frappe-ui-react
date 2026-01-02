import { InputHTMLAttributes, ReactNode } from "react";

export type SizeKey = "sm" | "md" | "lg" | "xl";
export type VariantKey = "subtle" | "outline";
export type TextInputState = "success" | "warning" | "error";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix">
{
  label?: string;
  description?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: SizeKey;
  variant?: VariantKey;
  state?: TextInputState;
  loading?: boolean;
  htmlId?: string;
  debounce?: number;
}



