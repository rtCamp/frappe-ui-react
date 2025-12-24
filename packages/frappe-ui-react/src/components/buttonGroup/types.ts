import { ButtonProps, ButtonSize, ButtonTheme, ButtonVariant } from "../button/types";

export interface ButtonGroupProps {
  buttons: ButtonProps[];
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
}
