/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { LayoutContainer } from "./layoutContainer";
import {
  validateLayout,
  ensureLayoutKeys,
  serializeLayout,
} from "./dashboardUtil";
import type { DashboardProps, WidgetLayout } from "./types";

export const DashboardGrid: React.FC<DashboardProps> = ({
  widgets,
  initialLayout,
  savedLayout,
  onLayoutChange,
  ...rest
}) => {
  const [layout, setLayout] = useState<WidgetLayout[]>(() => {
    const initialData =
      savedLayout && validateLayout(savedLayout) ? savedLayout : initialLayout;
    return ensureLayoutKeys(initialData);
  });

  useEffect(() => {
    if (savedLayout && validateLayout(savedLayout)) {
      setLayout(ensureLayoutKeys(savedLayout));
    }
  }, [savedLayout]);

  const handleLayoutChange = useCallback(
    (newLayout: WidgetLayout[]) => {
      setLayout(newLayout);
      onLayoutChange?.(serializeLayout(newLayout));
    },
    [onLayoutChange]
  );

  const handleDrop = useCallback(
    (
      widgetId: string,
      layoutData: { x: number; y: number; w: number; h: number }
    ) => {
      const widgetDef = widgets.find((w) => w.id === widgetId);
      if (!widgetDef) return;

      setLayout((prev) => {
        const existingCount = prev.filter(
          (item) => item.id === widgetId
        ).length;

        const newKey =
          existingCount === 0 ? widgetId : `${widgetId}-${existingCount}`;

        const newLayoutItem: WidgetLayout = {
          id: widgetId,
          key: newKey,
          x: layoutData.x,
          y: layoutData.y,
          w: layoutData.w,
          h: layoutData.h,
        };

        const updated = [...prev, newLayoutItem];
        onLayoutChange?.(serializeLayout(updated));

        return updated;
      });
    },
    [widgets, onLayoutChange]
  );

  const handleRemoveWidget = useCallback(
    (widgetKey: string) => {
      setLayout((prev) => {
        const newLayout = prev.filter((w) => (w.key || w.id) !== widgetKey);
        onLayoutChange?.(serializeLayout(newLayout));
        return newLayout;
      });
    },
    [onLayoutChange]
  );

  return (
    <LayoutContainer
      widgets={widgets}
      layout={layout}
      setLayout={handleLayoutChange}
      onDrop={handleDrop}
      onRemove={handleRemoveWidget}
      {...rest}
    />
  );
};

DashboardGrid.displayName = "DashboardGrid";

export default DashboardGrid;
