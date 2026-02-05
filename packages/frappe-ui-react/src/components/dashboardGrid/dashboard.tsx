/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState, useContext } from "react";

/**
 * Internal dependencies.
 */
import { LayoutContainer } from "./layoutContainer";
import {
  resolveWidgetSize,
  serializeLayouts,
  normalizeLayouts,
  deserializeLayouts,
} from "./dashboardUtil";
import type {
  DashboardProps,
  WidgetLayout,
  DashboardLayouts,
  Breakpoint,
} from "./types";
import { DashboardContext } from "./dashboardContext";

export const DashboardGrid: React.FC<DashboardProps> = ({
  widgets,
  initialLayouts,
  savedLayout,
  onLayoutChange,
  sizes,
  ...rest
}) => {
  const context = useContext(DashboardContext);

  const [layouts, setLayouts] = useState<DashboardLayouts>(() => {
    if (savedLayout) {
      return deserializeLayouts(savedLayout);
    }
    if (initialLayouts) {
      return normalizeLayouts(initialLayouts, widgets, sizes);
    }
    return {};
  });

  useEffect(() => {
    if (savedLayout) {
      setLayouts(deserializeLayouts(savedLayout));
    }
  }, [savedLayout]);

  const handleLayoutChange = useCallback(
    (newLayouts: DashboardLayouts) => {
      setLayouts(newLayouts);
      onLayoutChange?.(serializeLayouts(newLayouts));
    },
    [onLayoutChange]
  );

  const addWidgetToLayout = useCallback(
    (widgetId: string, position: { x: number; y: number }) => {
      const widgetDef = widgets.find((w) => w.id === widgetId);
      if (!widgetDef) return;

      setLayouts((prevLayouts) => {
        const newLayouts: DashboardLayouts = { ...prevLayouts };

        for (const bp in prevLayouts) {
          const breakpoint = bp as Breakpoint;
          const currentLayout = prevLayouts[breakpoint] || [];

          const existingCount = currentLayout.filter(
            (item) => item.id === widgetId
          ).length;

          const newKey =
            existingCount === 0 ? widgetId : `${widgetId}-${existingCount}`;

          const { w, h } = resolveWidgetSize(widgetDef, sizes);

          const newLayoutItem: WidgetLayout = {
            id: widgetId,
            key: newKey,
            x: position.x,
            y: position.y,
            w,
            h,
            size: widgetDef.size,
            isResizable: widgetDef.isResizable,
            isDraggable: widgetDef.isDraggable,
          };

          newLayouts[breakpoint] = [...currentLayout, newLayoutItem];
        }

        onLayoutChange?.(serializeLayouts(newLayouts));
        return newLayouts;
      });
    },
    [widgets, sizes, onLayoutChange]
  );
  const handleDrop = useCallback(
    (widgetId: string, layoutData: { x: number; y: number }) => {
      addWidgetToLayout(widgetId, layoutData);
    },
    [addWidgetToLayout]
  );

  const handleRemoveWidget = useCallback(
    (widgetKey: string) => {
      setLayouts((prevLayouts) => {
        const newLayouts: DashboardLayouts = {};

        for (const breakpoint in prevLayouts) {
          const currentLayout = prevLayouts[breakpoint as Breakpoint] || [];
          newLayouts[breakpoint as Breakpoint] = currentLayout.filter(
            (w) => (w.key || w.id) !== widgetKey
          );
        }

        onLayoutChange?.(serializeLayouts(newLayouts));
        return newLayouts;
      });
    },
    [onLayoutChange]
  );

  const handleAddWidget = useCallback(
    (widgetId: string) => {
      // Find the bottom-most Y position across all breakpoints
      let maxY = 0;
      for (const bp in layouts) {
        const currentLayout = layouts[bp as Breakpoint] || [];
        const bottomY = currentLayout.reduce((max, item) => {
          const itemBottom = (item.y || 0) + (item.h || 0);
          return itemBottom > max ? itemBottom : max;
        }, 0);
        maxY = Math.max(maxY, bottomY);
      }

      addWidgetToLayout(widgetId, { x: 0, y: maxY });
    },
    [addWidgetToLayout, layouts]
  );

  useEffect(() => {
    if (context) {
      context.setHandleAddWidget(() => handleAddWidget);
      context.setWidgets(widgets);
    }
  }, [context, handleAddWidget, widgets]);

  return (
    <LayoutContainer
      widgets={widgets}
      layouts={layouts}
      setLayouts={handleLayoutChange}
      onDrop={handleDrop}
      onRemove={handleRemoveWidget}
      sizes={sizes}
      {...rest}
    />
  );
};

DashboardGrid.displayName = "DashboardGrid";

export default DashboardGrid;
