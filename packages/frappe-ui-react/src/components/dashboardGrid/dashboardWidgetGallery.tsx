/**
 * External dependencies.
 */
import React from "react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import type { DashboardWidgetGalleryProps } from "./types";
import { DashboardWidgetGalleryItem } from "./dashboardWidgetGalleryItem";

export const DashboardWidgetGallery: React.FC<DashboardWidgetGalleryProps> = ({
  widgets,
  title,
  description,
  className,
  view = "list",
  mode = "both",
  onWidgetAdd,
  onWidgetDrop,
}) => {
  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-sm font-semibold text-ink-gray-9">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-ink-gray-5 mt-1">{description}</p>
          )}
        </div>
      )}
      <div
        className={clsx(
          view === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-2"
        )}
      >
        {widgets.map((widget) => (
          <DashboardWidgetGalleryItem
            key={widget.id}
            widget={widget}
            view={view}
            mode={mode}
            onWidgetAdd={onWidgetAdd}
            onWidgetDrop={onWidgetDrop}
          />
        ))}
      </div>
    </div>
  );
};
