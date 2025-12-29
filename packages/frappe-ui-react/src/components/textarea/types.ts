import { TextareaHTMLAttributes } from "react";

export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaVariant = "subtle" | "outline" | "ghost" | "underline";
export type TextAreaState = "success" | "warning" | "error";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  description?: string;
  error?: string;
  size?: TextAreaSize;
  variant?: TextAreaVariant;
  state?: TextAreaState;
  loading?: boolean;
  debounce?: number;
  htmlId?: string;
}

