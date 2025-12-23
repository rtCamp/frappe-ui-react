import type { ChangeEvent, CSSProperties } from "react";

export type TextAreaSize = "sm" | "md" | "lg" | "xl";
export type TextAreaVariant = "subtle" | "outline";

export interface TextareaProps {
  label?: string;
  description?: string; // Added
  error?: string;       // Added
  size?: TextAreaSize;
  variant?: TextAreaVariant;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  debounce?: number;
  rows?: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  htmlId?: string;
  className?: string;
  style?: CSSProperties;
  required?: boolean;
  [key: string]: any;   // Allow other standard props
}