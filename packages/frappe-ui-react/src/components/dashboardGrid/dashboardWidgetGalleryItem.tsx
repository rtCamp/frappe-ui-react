/**
 * External dependencies.
 */
import React from "react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import type { DashboardWidgetGalleryItemProps } from "./types";
import { useDashboardContext } from "./dashboardContext";
import { resolveWidgetSize } from "./dashboardUtil";

export const DashboardWidgetGalleryItem: React.FC<
  DashboardWidgetGalleryItemProps
> = ({ widget, view = "list", mode = "both", onWidgetAdd, onWidgetDrop }) => {
  const context = useDashboardContext();

  const handleDragStart = (e: React.DragEvent) => {
    const { w, h } = resolveWidgetSize(widget);

    const widgetData = {
      widgetId: widget.id,
      w,
      h,
    };

    if (context) {
      context.setDraggingWidget({ ...widgetData, widget });
    }

    e.dataTransfer.setData("text/plain", JSON.stringify(widgetData));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = () => {
    if (context) {
      context.setDraggingWidget(null);
    }
    onWidgetDrop?.(widget.id);
  };

  const handleClick = () => {
    if (mode === "click" || mode === "both") {
      context?.handleAddWidget?.(widget.id);
      onWidgetAdd?.(widget.id);
    }
  };

  const isDraggable = mode === "drag" || mode === "both";

  return (
    <div
      className={clsx(
        "cursor-pointer rounded-lg border border-outline-gray-2 bg-surface-cards overflow-hidden hover:border-outline-gray-3",
        view === "grid" && "text-center"
      )}
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
      onDragEnd={isDraggable ? handleDragEnd : undefined}
      onClick={handleClick}
      title={`Drag to add ${widget.name}`}
    >
      {widget.preview && (
        <div className="mb-2 w-full pointer-events-none relative">
          <div className="w-full h-32 overflow-hidden">
            <div className="scale-[0.5] origin-top-left w-[200%] h-[200%]">
              <widget.component {...(widget.preview.props || {})} />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface-cards to-transparent pointer-events-none" />
        </div>
      )}
      <div className="p-3 pt-0">
        <div className="font-medium text-sm text-ink-gray-9">{widget.name}</div>
        {widget.preview?.description && (
          <div className="text-xs text-ink-gray-5 mt-1">
            {widget.preview.description}
          </div>
        )}
        {widget.size && (
          <div className="text-xs text-ink-gray-4 mt-1">{widget.size}</div>
        )}
      </div>
    </div>
  );
};
