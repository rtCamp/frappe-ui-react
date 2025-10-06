import React, { useMemo } from "react";

export type Size = "sm" | "md";

export interface FormLabelProps {
  label: string;
  size?: Size;
  id?: string;
  required?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({
  label,
  size = "sm",
  id,
  required = false,
}) => {
  const labelClasses = useMemo(() => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-base",
    }[size];
    return `block ${sizeClasses} text-ink-gray-5`;
  }, [size]);

  return (
    <label className={labelClasses} htmlFor={id} data-testid="form-label">
      {label}
      {required && (
        <>
          <span className="text-ink-red-3 select-none" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  );
};

export default FormLabel;
