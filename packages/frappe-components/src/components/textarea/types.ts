export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'subtle' | 'outline';

export interface TextareaProps {
  label?: string;
  size?: Size;
  variant?: 'subtle' | 'outline';
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  value?: string;
  debounce?: number;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  htmlId?: string;
}
