/**
 * External dependencies.
 */
import React from "react";

/**
 * Internal dependencies.
 */
import { clsx } from "clsx";
import { Slot } from "./slot";
import type { LayoutProps } from "./types";

export const Layout: React.FC<LayoutProps> = ({
  widgets,
  items,
  layoutIndex,
  layoutFlow = "row",
  parentLocked = false,
  onAddWidget,
  onRemoveWidget,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-wrap gap-4 min-h-[100px]",
        layoutFlow === "row" ? "flex-row" : "flex-col"
      )}
    >
      {items.map((layoutItem, slotIndex) => {
        const slotId = `layout-${layoutIndex}-slot-${slotIndex}`;
        return (
          <Slot
            key={slotId}
            widgets={widgets}
            widgetId={layoutItem.widgetId}
            slotId={slotId}
            size={layoutItem.size}
            parentLocked={parentLocked}
            onAddWidget={(widgetId) =>
              onAddWidget(layoutIndex, slotIndex, widgetId)
            }
            onRemoveWidget={() => onRemoveWidget(layoutIndex, slotIndex)}
          />
        );
      })}
    </div>
  );
};
