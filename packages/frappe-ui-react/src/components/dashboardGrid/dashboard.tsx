/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { LayoutContainer } from "./layoutContainer";
import { validateLayout } from "./dashboardUtil";
import type { DashboardProps, WidgetLayout } from "./types";

export const DashboardGrid: React.FC<DashboardProps> = ({
  widgets,
  initialLayout,
  savedLayout,
  onLayoutChange,
  ...rest
}) => {
  const [layout, setLayout] = useState<WidgetLayout[]>(
    savedLayout && validateLayout(savedLayout) ? savedLayout : initialLayout
  );

  useEffect(() => {
    if (savedLayout && validateLayout(savedLayout)) {
      setLayout(savedLayout);
    }
  }, [savedLayout]);

  const handleLayoutChange = useCallback(
    (newLayout: WidgetLayout[]) => {
      setLayout(newLayout);
      onLayoutChange?.(newLayout);
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

      const newWidgetId = `${widgetId}-${Date.now()}`;

      const newLayoutItem: WidgetLayout = {
        id: newWidgetId,
        x: layoutData.x,
        y: layoutData.y,
        w: layoutData.w,
        h: layoutData.h,
      };

      setLayout((prev) => [...prev, newLayoutItem]);
      onLayoutChange?.([...layout, newLayoutItem]);
    },
    [widgets, layout, onLayoutChange]
  );

  const handleRemoveWidget = useCallback(
    (widgetId: string) => {
      const newLayout = layout.filter((w) => w.id !== widgetId);
      setLayout(newLayout);
      onLayoutChange?.(newLayout);
    },
    [layout, onLayoutChange]
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
