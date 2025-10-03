import React, { useMemo } from "react";
import { FormControlProps } from "./types";
import { Autocomplete } from "../autoComplete";
import { Checkbox } from "../checkbox";
import { TextInput } from "../textInput";
import type { SizeTypes } from "../../types";
import FormLabel from "../formLabel";
import Textarea from "../textarea/textarea";
import { Select, type SelectOption } from "../select";
import { AutocompleteOption } from "../autoComplete";

const FormControl: React.FC<FormControlProps> = ({
  label,
  description,
  type = "text",
  size = "sm",
  variant = "subtle",
  required = false,
  htmlId,
  ...attrs
}) => {
  const controlAttrs = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, style, ...rest } = attrs;
    return rest;
  }, [attrs]);

  const descriptionClasses = useMemo(() => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-base",
    }[size as keyof SizeTypes];
    return `${sizeClasses} text-ink-gray-5`;
  }, [size]);

  const renderControl = () => {
    switch (type) {
      case "select":
        return (
          <Select
            htmlId={htmlId}
            {...controlAttrs}
            size={size}
            variant={variant}
            options={controlAttrs.options as (string | SelectOption)[]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              controlAttrs.onChange?.(e.target.value);
            }}
          />
        );
      case "autocomplete":
        return (
          <Autocomplete
            options={controlAttrs.options as AutocompleteOption[]}
            value={controlAttrs.modelValue}
            {...controlAttrs}
          />
        );
      case "textarea":
        return (
          <Textarea
            htmlId={htmlId}
            {...controlAttrs}
            size={size}
            variant={variant}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            htmlId={htmlId}
            {...controlAttrs}
            label={label}
            size={size}
          />
        );
      default:
        return (
          <TextInput
            htmlId={htmlId}
            {...controlAttrs}
            type={type}
            size={size}
            variant={variant}
            required={required}
          />
        );
    }
  };

  if (type === "checkbox") {
    return renderControl();
  }

  return (
    <div
      className={`space-y-1.5 ${attrs.className || ""}`}
      style={attrs.style}
      data-testid="form-control"
    >
      {label && (
        <FormLabel label={label} size={size} id={htmlId} required={required} />
      )}
      {renderControl()}
      {description && <p className={descriptionClasses}>{description}</p>}
    </div>
  );
};

export default FormControl;
