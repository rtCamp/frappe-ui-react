import { ButtonProps, ButtonSize, ButtonTheme, ButtonVariant } from "../button/types";

export interface ButtonGroupProps {
  buttons: (ButtonProps & { id?: string })[];
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
}
