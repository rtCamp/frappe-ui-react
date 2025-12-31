/**
 * External dependencies.
 */
import { useCallback, useState } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

/**
 * Internal dependencies.
 */
import { TagProps } from "./types";
import Button from "../button/button";

const Tag = ({
  size,
  variant,
  label,
  prefixIcon,
  suffixIcon: SuffixIcon = X,
  className,
  disabled = false,
  visible: controlledVisible,
  onVisibleChange,
  onRemove,
}: TagProps) => {
  const [internalVisible, setInternalVisible] = useState(true);

  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : internalVisible;

  const handleRemove = useCallback(() => {
    if (isControlled) {
      onVisibleChange?.(false);
    } else {
      setInternalVisible(false);
    }
    onRemove?.();
  }, [isControlled, onVisibleChange, onRemove]);

  if (!visible) return null;

  return (
    <Button
      size={size}
      variant={variant}
      label={label}
      iconLeft={prefixIcon}
      iconRight={() => (
        <button
          type="button"
          className={clsx(
            "flex items-center justify-center",
            disabled && "cursor-auto!"
          )}
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remove tag"
        >
          <SuffixIcon
            className="w-3 h-3"
            aria-hidden="true"
            focusable="false"
          />
        </button>
      )}
      className={clsx(
        "focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-outline-gray-3 gap-1.25! cursor-auto!",
        size === "sm" && "text-xs! h-5! rounded-[5px]! px-1.5! py-0.75!",
        size === "md" && "text-sm! h-6! rounded-[6px]! px-1.5! py-1!",
        size === "lg" && "text-base! h-7! rounded-[8px]! px-2! py-1.5!",
        className
      )}
      disabled={disabled}
    />
  );
};

export default Tag;
