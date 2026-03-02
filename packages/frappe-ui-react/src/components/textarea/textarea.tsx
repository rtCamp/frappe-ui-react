import React, { useMemo, useRef, useCallback, forwardRef } from "react";

import { debounce } from "../../utils/debounce";
import { cn } from "../../utils";
import type { TextareaProps } from "./types";
import { textareaVariants, textareaLabelVariants } from "./variants";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      size = "sm",
      variant = "subtle",
      disabled = false,
      value,
      onChange,
      debounce: debounceTime,
      rows = 3,
      placeholder,
      id,
      className = "",
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setRefs = useCallback(
      (node: HTMLTextAreaElement) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    const emitChange = useCallback(
      (value: string) => {
        if (onChange) {
          const syntheticEvent = {
            target: { value },
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(syntheticEvent);
        }
      },
      [onChange]
    );

    const debouncedEmitChange = useMemo(() => {
      if (debounceTime) {
        return debounce((value: string) => emitChange(value), debounceTime);
      }
      return emitChange;
    }, [debounceTime, emitChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        debouncedEmitChange(e.target.value);
      },
      [debouncedEmitChange]
    );

    return (
      <div className="space-y-1.5">
        {label && (
          <label className={textareaLabelVariants({ size })} htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          rows={rows}
          placeholder={placeholder}
          className={cn(
            textareaVariants({ size, variant, disabled }),
            className
          )}
          disabled={disabled}
          id={id}
          value={value}
          onChange={handleChange}
          data-testid="textarea"
        />
      </div>
    );
  }
);

export default Textarea;
