export type ButtonTheme = "gray" | "blue" | "green" | "red";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type ButtonVariant = "solid" | "subtle" | "outline" | "ghost";
export type ButtonThemeVariant = `${ButtonTheme}-${ButtonVariant}`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  size?: ButtonSize;
  variant?: ButtonVariant;
  label?: string;
  icon?: string | React.ComponentType<unknown>;
  iconLeft?: string | React.ComponentType<unknown>;
  iconRight?: string | React.ComponentType<unknown>;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  link?: string;
  tooltip?: string;
  children?: React.ReactNode;
}
