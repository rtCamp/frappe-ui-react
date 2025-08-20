import type { ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg' | 'xl';
export type SelectVariant = 'subtle' | 'outline' | 'ghost';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  size?: SelectSize;
  variant?: SelectVariant;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  options: (string | SelectOption)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  htmlId?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

}