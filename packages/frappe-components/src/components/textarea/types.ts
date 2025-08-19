export interface TextareaProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "subtle" | "outline";
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  value?: string;
  debounce?: number;
  rows?: number;
  label?: string;
  onChange?: (value: string) => void;
  className?: string;
}
