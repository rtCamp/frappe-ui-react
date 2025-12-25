import { InputHTMLAttributes, ReactNode } from "react";

export type SizeKey = "sm" | "md" | "lg" | "xl";
export type VariantKey = "subtle" | "outline" | "ghost";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix"> {
  label?: string;
  description?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: SizeKey;
  variant?: VariantKey;
  htmlId?: string;
  debounce?: number;
}
