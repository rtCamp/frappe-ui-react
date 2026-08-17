import React, { useMemo } from "react";

import { cn } from "../utils/cn";

export type Size = "sm" | "md";

export interface FormLabelProps {
  label?: string;
  children?: React.ReactNode;
  size?: Size;
  id?: string;
  required?: boolean;
  className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  label,
  children,
  size = "sm",
  id,
  required = false,
  className,
}) => {
  const labelClasses = useMemo(() => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-base",
    }[size];
    return cn("block", sizeClasses, "text-ink-gray-5", className);
  }, [size, className]);

  return (
    <label className={labelClasses} htmlFor={id} data-testid="form-label">
      {children ?? label}
      {required && (
        <>
          <span
            className="text-ink-red-3 select-none ml-0.5"
            aria-hidden="true"
          >
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  );
};

export default FormLabel;
