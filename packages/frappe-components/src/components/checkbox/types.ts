export interface CheckboxProps {
  size?: 'sm' | 'md';
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  padding?: boolean;
  value?: boolean;
  onChange?: (val: boolean) => void;
  htmlId?: string;
  extraClasses?: string;
}