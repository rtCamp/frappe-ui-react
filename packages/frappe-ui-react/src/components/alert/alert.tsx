/**
 * External dependencies.
 */
import React, { useCallback, useState } from "react";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import type { AlertProps } from "./types";
import { Button } from "../button";
import { cn } from "../../utils";

const alertVariants = cva(
  "grid grid-cols-[auto_1fr_auto] gap-3 rounded-md px-4 py-3.5 text-base items-start",
  {
    variants: {
      variant: {
        subtle: "",
        outline: "",
      },
      theme: {
        yellow: "",
        blue: "",
        red: "",
        green: "",
        default: "",
      },
    },
    compoundVariants: [
      // Subtle
      { variant: "subtle", theme: "yellow", class: "bg-surface-amber-2" },
      { variant: "subtle", theme: "blue", class: "bg-surface-blue-2" },
      { variant: "subtle", theme: "red", class: "bg-surface-red-2" },
      { variant: "subtle", theme: "green", class: "bg-surface-green-2" },
      { variant: "subtle", theme: "default", class: "bg-surface-gray-2" },

      // Outline
      {
        variant: "outline",
        theme: "yellow",
        class: "border border-outline-amber-2",
      },
      {
        variant: "outline",
        theme: "blue",
        class: "border border-outline-blue-1",
      },
      {
        variant: "outline",
        theme: "red",
        class: "border border-outline-red-2",
      },
      {
        variant: "outline",
        theme: "green",
        class: "border border-outline-green-2",
      },
      {
        variant: "outline",
        theme: "default",
        class: "border border-outline-gray-3",
      },
    ],
    defaultVariants: {
      variant: "subtle",
      theme: "default",
    },
  }
);

const iconData = {
  yellow: { component: TriangleAlert, css: "text-ink-amber-3" },
  blue: { component: Info, css: "text-ink-blue-3" },
  red: { component: CircleX, css: "text-ink-red-3" },
  green: { component: CircleCheck, css: "text-ink-green-3" },
  default: { component: Info, css: "text-ink-gray-6" },
};

const Alert: React.FC<AlertProps> = ({
  title,
  theme,
  variant = "subtle",
  description,
  dismissable = true,
  visible: controlledVisible,
  onVisibleChange,
  icon,
  footer,
  className,
}) => {
  const [internalVisible, setInternalVisible] = useState(true);

  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : internalVisible;

  const handleDismiss = useCallback(() => {
    if (!isControlled) {
      setInternalVisible(false);
    }
    onVisibleChange?.(false);
  }, [isControlled, onVisibleChange]);

  const iconConfig = iconData[theme || "default"];

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, theme }), className)}
    >
      {icon ? (
        icon()
      ) : icon !== false && iconConfig ? (
        <iconConfig.component className={cn("h-4 w-4", iconConfig.css)} />
      ) : null}

      <div
        className={cn(
          "grid gap-2",
          (icon === false || !iconConfig) && "col-span-2"
        )}
      >
        <h3 className="text-ink-gray-9">{title}</h3>
        {description ? (
          typeof description === "string" ? (
            <p className="text-ink-gray-6 text-base/normal font-[420]">
              {description}
            </p>
          ) : (
            description()
          )
        ) : null}
      </div>

      {dismissable && (
        <Button
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          variant="ghost"
          className="w-4! h-4! hover:bg-transparent"
          icon={() => <X className="h-4 w-4" />}
        />
      )}

      {footer ? <div className="col-span-full">{footer()}</div> : null}
    </div>
  );
};

export default Alert;
