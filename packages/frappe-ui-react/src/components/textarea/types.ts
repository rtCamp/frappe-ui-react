export type TextAreaSize = "sm" | "md" | "lg" | "xl";
export type TextAreaVariant = "subtle" | "outline";

export interface TextareaProps {
  size?: TextAreaSize;
  variant?: TextAreaVariant;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  value?: string;
  debounce?: number;
  rows?: number;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}
