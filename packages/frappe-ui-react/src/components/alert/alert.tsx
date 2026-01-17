/**
 * External dependencies.
 */
import React, { useCallback, useMemo, useState } from "react";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import type { AlertProps } from "./types";

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
}) => {
  const [internalVisible, setInternalVisible] = useState(true);

  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : internalVisible;

  const handleDismiss = useCallback(() => {
    if (isControlled) {
      onVisibleChange?.(false);
    } else {
      setInternalVisible(false);
    }
  }, [isControlled, onVisibleChange]);

  const classes = useMemo(() => {
    const subtleBgs = {
      yellow: "bg-surface-amber-2",
      blue: "bg-surface-blue-2",
      red: "bg-surface-red-2",
      green: "bg-surface-green-2",
    };

    if (variant === "outline") return "border border-outline-gray-3";

    return theme ? subtleBgs[theme] : "bg-surface-gray-2";
  }, [theme, variant]);

  const iconConfig = useMemo(() => {
    const data = {
      yellow: { component: TriangleAlert, css: "text-ink-amber-3" },
      blue: { component: Info, css: "text-ink-blue-3" },
      red: { component: CircleX, css: "text-ink-red-3" },
      green: { component: CircleCheck, css: "text-ink-green-3" },
    };
    return theme ? data[theme] : null;
  }, [theme]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={clsx("grid grid-cols-[auto_1fr_auto] gap-3 rounded-md px-4 py-3.5 text-base items-start", classes)}
    >
      {icon ? (
        icon()
      ) : iconConfig ? (
        <iconConfig.component className={clsx("h-4 w-4", iconConfig.css)} />
      ) : null}

      <div className={clsx("grid gap-2", !icon && !iconConfig && "col-span-2")}>
        <span className="text-ink-gray-9">{title}</span>

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
        <button onClick={handleDismiss} aria-label="Dismiss alert">
          <X className="h-4 w-4" />
        </button>
      )}

      {footer ? <div className="col-span-full">{footer()}</div> : null}
    </div>
  );
};

export default Alert;
