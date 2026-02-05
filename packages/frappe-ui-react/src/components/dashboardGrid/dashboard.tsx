/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { LayoutContainer } from "./layoutContainer";
import {
  ensureLayoutKeys,
  serializeLayout,
  normalizeLayout,
  deserializeLayout,
} from "./dashboardUtil";
import type { DashboardProps, WidgetLayout } from "./types";

export const DashboardGrid: React.FC<DashboardProps> = ({
  widgets,
  initialLayout = [],
  savedLayout,
  onLayoutChange,
  sizes,
  ...rest
}) => {
  const [layout, setLayout] = useState<WidgetLayout[]>(() => {
    if (savedLayout && savedLayout.length > 0) {
      const deserialized = deserializeLayout(savedLayout);
      if (deserialized.length > 0) {
        return deserialized;
      }
    }
    const normalized = normalizeLayout(initialLayout || [], widgets, sizes);
    return ensureLayoutKeys(normalized);
  });

  useEffect(() => {
    if (savedLayout && savedLayout.length > 0) {
      const deserialized = deserializeLayout(savedLayout);
      if (deserialized.length > 0) {
        setLayout(deserialized);
      }
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
    (widgetId: string, layoutData: { x: number; y: number }) => {
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
          size: widgetDef.size,
          isResizable: widgetDef.isResizable,
          isDraggable: widgetDef.isDraggable,
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
        const updated = prev.filter((w) => (w.key || w.id) !== widgetKey);
        onLayoutChange?.(serializeLayout(updated));
        return updated;
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
      sizes={sizes}
      {...rest}
    />
  );
};

DashboardGrid.displayName = "DashboardGrid";

export default DashboardGrid;
