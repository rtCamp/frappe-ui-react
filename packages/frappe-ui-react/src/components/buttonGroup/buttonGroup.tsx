/**
 * External dependencies.
 */
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { ButtonGroupProps } from "./types";
import Button from "../button/button";

const ButtonGroup = ({
  buttons,
  className,
  size,
  variant,
  theme,
}: ButtonGroupProps) => {
  return (
    <div className={clsx("flex gap-1 items-center", className)}>
      {buttons.map((buttonProps, index) => (
        <Button key={`button-group-${index}`} size={size} variant={variant} theme={theme} {...buttonProps} />
      ))}
    </div>
  );
};

export default ButtonGroup;
