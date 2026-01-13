import { ButtonVariant } from "../button/types";

export interface TagProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: ButtonVariant;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefixIcon?: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffixIcon?: React.ComponentType<any>;
  className?: string;
  disabled?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onRemove?: () => void;
}
