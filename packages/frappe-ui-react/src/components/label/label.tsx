/**
 * External dependencies.
 */
import { Field } from "@base-ui/react/field";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import type { LabelProps } from "./types";
import { cn } from "../../utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Field.Label className={cn(labelVariants(), className)} {...props}>
      {children}
    </Field.Label>
  );
};

Label.displayName = "Label";
