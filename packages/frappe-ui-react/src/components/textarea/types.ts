import { TextareaHTMLAttributes } from "react";

export type TextAreaSize = "sm" | "md" | "lg" | "xl";
export type TextAreaVariant = "subtle" | "outline";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  description?: string;
  error?: string;
  size?: TextAreaSize;
  variant?: TextAreaVariant;
  debounce?: number;
  htmlId?: string;
}
