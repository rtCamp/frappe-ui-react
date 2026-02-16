/**
 * External dependencies.
 */
import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { type Layout as RGLLayout } from "react-grid-layout/legacy";

/**
 * Internal dependencies.
 */
import { LayoutContainer } from "./layoutContainer";
import {
  resolveWidgetSize,
  serializeLayouts,
  normalizeLayouts,
  deserializeLayouts,
  deepCompareObjects,
  findBottomY,
} from "./dashboardUtil";
import type {
  DashboardProps,
  WidgetLayout,
  DashboardLayouts,
  Breakpoint,
  WidgetLayouts,
} from "./types";
import { DashboardContext } from "./dashboardContext";

export const Dashboard: React.FC<DashboardProps> = ({
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
  const prevInitialLayoutsRef = useRef<WidgetLayouts | undefined>(
    initialLayouts
  );
  const prevSavedLayoutRef = useRef<DashboardLayouts | undefined>(savedLayout);

  const addWidgetToLayout = useCallback(
    (
      widgetId: string,
      position: { x: number; y: number; w?: number; h?: number },
      isDropped = false,
      currentLayout?: RGLLayout[]
    ) => {
      const widgetDef = widgets.find((w) => w.id === widgetId);
      if (!widgetDef) return;

      setLayouts((prevLayouts) => {
        const newLayouts: DashboardLayouts = { ...prevLayouts };

        for (const bp in prevLayouts) {
          const breakpoint = bp as Breakpoint;
          const layout = prevLayouts[breakpoint] || [];

          // Disable compaction and freeze all widgets at their current preview positions
          // to ensure the widget is placed exactly where it was dropped.
          const baseLayout =
            isDropped && currentLayout
              ? layout.map((item) => {
                  const rglItem = currentLayout
                    .flat()
                    .find(
                      (rgl) =>
                        (rgl as { i: string }).i === (item.key || item.id)
                    );
                  return rglItem
                    ? {
                        ...item,
                        x: (rglItem as { x: number }).x,
                        y: (rglItem as { y: number }).y,
                        static: true,
                      }
                    : { ...item, static: true };
                })
              : layout;

          const existingCount = layout.filter(
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
            static: widgetDef.static,
          };

          newLayouts[breakpoint] = [...baseLayout, newLayoutItem];
        }

        onLayoutChange?.(serializeLayouts(newLayouts));
        return newLayouts;
      });

      if (isDropped) {
        // Use queueMicrotask to ensure state update does not get batched, allowing the new widget
        // to be placed correctly without any visual glitches
        queueMicrotask(() => {
          setLayouts((prevLayouts) => {
            const newLayouts: DashboardLayouts = { ...prevLayouts };

            for (const bp in prevLayouts) {
              const breakpoint = bp as Breakpoint;
              newLayouts[breakpoint] = prevLayouts[breakpoint]?.map((item) => ({
                ...item,
                static: widgets.find((w) => w.id === item.id)?.static,
              }));
            }

            onLayoutChange?.(serializeLayouts(newLayouts));
            return newLayouts;
          });
        });
      }
    },
    [widgets, sizes, onLayoutChange]
  );

  const handleDropWidget = useCallback(
    (currentLayout: RGLLayout[], item: RGLLayout) => {
      const widgetData = context?.draggingWidget;
      const widgetId = widgetData?.widgetId;
      if (!widgetId || !item) return;

      addWidgetToLayout(
        widgetId,
        {
          x: item.x,
          y: item.y,
          w: widgetData.w,
          h: widgetData.h,
        },
        true,
        currentLayout
      );
    },
    [addWidgetToLayout, context?.draggingWidget]
  );

  const handleAddWidget = useCallback(
    (widgetId: string) => {
      addWidgetToLayout(widgetId, { x: 0, y: findBottomY(layouts) });
    },
    [addWidgetToLayout, layouts]
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

  useEffect(() => {
    if (context) {
      context.setHandleAddWidget(() => handleAddWidget);
      context.setWidgets(widgets);
    }
  }, [context, handleAddWidget, widgets]);

  // Sync with external layout changes
  useEffect(() => {
    if (initialLayouts && !savedLayout) {
      if (
        !deepCompareObjects(initialLayouts, prevInitialLayoutsRef.current || {})
      ) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- We want to reset layout if initialLayouts changes
        setLayouts(normalizeLayouts(initialLayouts, widgets, sizes));
      }
      prevInitialLayoutsRef.current = initialLayouts;
    } else if (savedLayout) {
      if (!deepCompareObjects(savedLayout, prevSavedLayoutRef.current || {})) {
        setLayouts(deserializeLayouts(savedLayout));
      }
      prevSavedLayoutRef.current = savedLayout;
    }
  }, [savedLayout, initialLayouts, widgets, sizes]);

  return (
    <LayoutContainer
      widgets={widgets}
      layouts={layouts}
      handleDropWidget={handleDropWidget}
      handleRemoveWidget={handleRemoveWidget}
      sizes={sizes}
      onLayoutChange={onLayoutChange}
      {...rest}
    />
  );
};

export default Dashboard;
