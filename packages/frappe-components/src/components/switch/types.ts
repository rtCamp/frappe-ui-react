export type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  size?: "sm" | "md";
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};
