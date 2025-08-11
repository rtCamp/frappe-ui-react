import { type ReactNode } from 'react';


export type ButtonTheme = 'gray' | 'blue' | 'green' | 'red';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';


export type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost';

export type ThemeVariant = `${ButtonTheme}-${ButtonVariant}`;

export interface ButtonProps {
  theme?: ButtonTheme;
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  label?: string;
  route?: string;
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  extraClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}