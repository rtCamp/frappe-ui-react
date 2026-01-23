import { TextareaHTMLAttributes } from "react";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaVariant = "subtle" | "outline" | "ghost" | "underline";
export type TextareaState = "success" | "warning" | "error";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: TextareaSize;
  variant?: TextareaVariant;
  state?: TextareaState;
  loading?: boolean;
  debounce?: number;
  disabled?: boolean;
  htmlId?: string;
  value?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
