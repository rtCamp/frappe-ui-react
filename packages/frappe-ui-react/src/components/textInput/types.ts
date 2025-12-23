import type { ReactNode, ChangeEvent, CSSProperties } from "react";
// Remove "../common/types" if it causes issues, otherwise keep it. 
// Assuming TextInputTypes is simple string union for now to be safe.
export type TextInputType = "text" | "number" | "email" | "password" | "search" | "tel" | "url" | "date" | "datetime-local" | "time";

export interface TextInputProps {
  type?: TextInputType;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "subtle" | "outline" | "ghost";
  placeholder?: string;
  disabled?: boolean;
  htmlId?: string;
  value?: string | number;
  debounce?: number;
  required?: boolean;
  label?: string;        // Added
  description?: string;  // Added
  error?: string;        // Added
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;    // Simplified type
  suffix?: ReactNode;    // Simplified type
  className?: string;
  style?: CSSProperties; // Improved type
  [key: string]: any;    // Allow other standard input props (onBlur, onFocus, etc.)
}