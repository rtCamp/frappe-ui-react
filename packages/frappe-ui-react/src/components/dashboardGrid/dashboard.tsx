/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState, useContext } from "react";
import type { Layout as RGLLayout } from "react-grid-layout";

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
  const [disableCompaction, setDisableCompaction] = useState(false);

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
    (
      widgetId: string,
      position: { x: number; y: number },
      isDropped = false
    ) => {
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
            static: isDropped ? true : widgetDef.static,
          };

          newLayouts[breakpoint] = [...currentLayout, newLayoutItem];
        }

        onLayoutChange?.(serializeLayouts(newLayouts));
        return newLayouts;
      });

      if (isDropped) {
        // Execute after current task completes to resolve maximum call stack issue
        queueMicrotask(() => {
          setLayouts((prevLayouts) => {
            const newLayouts: DashboardLayouts = { ...prevLayouts };

            for (const bp in prevLayouts) {
              const breakpoint = bp as Breakpoint;
              const currentLayout = prevLayouts[breakpoint] || [];

              newLayouts[breakpoint] = currentLayout.map((item) => {
                const widgetDef = widgets.find((w) => w.id === item.id);

                return {
                  ...item,
                  static: widgetDef?.static,
                  isResizable: widgetDef?.isResizable,
                  isDraggable: widgetDef?.isDraggable,
                };
              });
            }

            return newLayouts;
          });

          setDisableCompaction(false);
        });
      }
    },
    [widgets, sizes, onLayoutChange]
  );
  const handleDrop = useCallback(
    (
      widgetId: string,
      layoutData: { x: number; y: number },
      currentLayout?: RGLLayout[]
    ) => {
      // Disable compaction and freeze all widgets at their current preview positions to ensure the widget is placed exactly where it was dropped
      setDisableCompaction(true);
      setLayouts((prevLayouts) => {
        const newLayouts: DashboardLayouts = { ...prevLayouts };

        for (const bp in prevLayouts) {
          const breakpoint = bp as Breakpoint;
          const layout = prevLayouts[breakpoint] || [];

          newLayouts[breakpoint] = layout.map((item) => {
            if (currentLayout) {
              const rglItem = currentLayout.find(
                (rgl) => rgl.i === (item.key || item.id)
              );
              if (rglItem) {
                return {
                  ...item,
                  x: rglItem.x,
                  y: rglItem.y,
                  static: true,
                };
              }
            }
            return {
              ...item,
              static: true,
            };
          });
        }

        return newLayouts;
      });

      addWidgetToLayout(widgetId, layoutData, true);
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
      // Find the bottom-most Y positions
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
      compactType={disableCompaction ? null : rest.compactType}
      {...rest}
    />
  );
};

DashboardGrid.displayName = "DashboardGrid";

export default DashboardGrid;
