/**
 * External dependencies.
 */
import { Field } from "@base-ui/react/field";
import { cva } from "class-variance-authority";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import type { LabelProps } from "./types";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Field.Label className={clsx(labelVariants(), className)} {...props}>
      {children}
    </Field.Label>
  );
};

Label.displayName = "Label";
