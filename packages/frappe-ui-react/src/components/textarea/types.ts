export type TextAreaSize = "sm" | "md" | "lg" | "xl";
export type TextAreaVariant = "subtle" | "outline";

export interface TextareaProps {
  label?: string;
  size?: TextAreaSize;
  variant?: TextAreaVariant;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  value?: string;
  debounce?: number;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  extraClasses?: string;
  htmlId?: string;
}
