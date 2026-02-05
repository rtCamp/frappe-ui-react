/**
 * External dependencies.
 */
import { useCallback, useMemo, useEffect, useState, useContext } from "react";
import clsx from "clsx";
import {
  WidthProvider,
  Responsive,
  Layout as RGLLayout,
} from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./dashboard.css";

/**
 * Internal dependencies.
 */
import { WidgetWrapper } from "./widgetWrapper";
import type {
  LayoutContainerProps,
  WidgetLayout,
  Breakpoint,
  DashboardLayouts,
} from "./types";
import { DashboardContext } from "./dashboardContext";
import { resolveWidgetSize } from "./dashboardUtil";
import React from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  widgets,
  layouts,
  setLayouts,
  onDrop,
  onRemove,
  sizes,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  breakpoints,
  cols,
  rowHeight = 100,
  margin = [16, 16],
  compactType = "vertical",
  isBounded = true,
  className = "",
}) => {
  const context = useContext(DashboardContext);
  const [isMounted, setIsMounted] = useState(false);
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>("lg");

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const defaultBreakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const actualBreakpoints = breakpoints || defaultBreakpoints;
  const actualCols = cols || defaultCols;

  const widgetMap = useMemo(
    () => new Map(widgets.map((w) => [w.id, w])),
    [widgets]
  );

  const rglLayouts = useMemo(() => {
    const result: { [key: string]: RGLLayout[] } = {};

    for (const breakpoint in layouts) {
      const layout = layouts[breakpoint as Breakpoint];
      if (layout) {
        result[breakpoint] = layout.map((item: WidgetLayout) => {
          const widgetDef = widgetMap.get(item.id);
          const size = resolveWidgetSize(item, sizes, widgetDef);
          return {
            i: item.key || item.id,
            x: item.x ?? 0,
            y: item.y ?? 0,
            w: size.w,
            h: size.h,
            minW: size.minW,
            minH: size.minH,
            maxW: size.maxW,
            maxH: size.maxH,
            static: item.static,
            isDraggable:
              item.isDraggable !== undefined
                ? item.isDraggable
                : widgetDef?.isDraggable ?? !layoutLock,
            isResizable:
              size.isResizable !== undefined ? size.isResizable : true,
          };
        });
      }
    }

    return result;
  }, [layouts, sizes, layoutLock, widgetMap]);

  const handleLayoutChange = useCallback(
    (
      _currentLayout: RGLLayout[],
      allLayouts: { [key: string]: RGLLayout[] }
    ) => {
      if (layoutLock || !setLayouts) return;

      const newLayouts: DashboardLayouts = {};

      for (const breakpoint in allLayouts) {
        const rglLayout = allLayouts[breakpoint];
        const originalLayout = layouts[breakpoint as Breakpoint] || [];

        const layoutMap = new Map(
          rglLayout.map((item: RGLLayout) => [item.i, item])
        );
        const updatedLayout: WidgetLayout[] = originalLayout.map(
          (item: WidgetLayout) => {
            const key = item.key || item.id;
            const rglItem = layoutMap.get(key);
            if (!rglItem) return item;
            return {
              ...item,
              x: rglItem.x,
              y: rglItem.y,
              w: rglItem.w,
              h: rglItem.h,
              static: rglItem.static,
              isDraggable: rglItem.isDraggable,
              isResizable: rglItem.isResizable,
            };
          }
        );

        newLayouts[breakpoint as Breakpoint] = updatedLayout;
      }

      setLayouts(newLayouts);
    },
    [layouts, setLayouts, layoutLock]
  );

  const handleBreakpointChange = useCallback((breakpoint: Breakpoint) => {
    setActiveBreakpoint(breakpoint);
  }, []);

  const handleDrop = useCallback(
    (layoutItem: RGLLayout[], item: RGLLayout) => {
      if (!onDrop) return;

      const widgetData = context?.draggingWidget;

      if (widgetData?.widgetId) {
        onDrop(widgetData.widgetId, {
          x: item.x,
          y: item.y,
          w: widgetData.w,
          h: widgetData.h,
        });
      }

      if (context) {
        context.setDraggingWidget(null);
      }
    },
    [onDrop, context]
  );

  const droppingItemSize = useMemo(() => {
    if (!context?.draggingWidget?.widget) return { w: 4, h: 3 };

    const widgetDef = context.draggingWidget.widget;
    const dummyLayout: WidgetLayout = { id: widgetDef.id, x: 0, y: 0 };
    const resolved = resolveWidgetSize(dummyLayout, sizes, widgetDef);

    return { w: resolved.w, h: resolved.h };
  }, [context?.draggingWidget?.widget, sizes]);

  const commonProps = {
    className: clsx(
      "layout min-h-full",
      !isMounted && "react-grid-layout-no-transition"
    ),
    rowHeight,
    margin,
    onLayoutChange: handleLayoutChange,
    onBreakpointChange: handleBreakpointChange,
    onDrop: onDrop ? handleDrop : undefined,
    isDroppable: Boolean(onDrop),
    droppingItem: onDrop
      ? {
          i: "__dropping-elem__",
          w: droppingItemSize.w,
          h: droppingItemSize.h,
        }
      : undefined,
    isBounded,
    isDraggable: !layoutLock,
    isResizable: !layoutLock,
    draggableHandle: dragHandle ? ".dashboard-drag-handle" : undefined,
    draggableCancel: ".dashboard-drag-cancel",
    compactType,
    preventCollision: false,
    allowOverlap: false,
    useCSSTransforms: true,
  };

  const handleRemoveWidget = useCallback(
    (widgetKey: string) => {
      onRemove?.(widgetKey);
    },
    [onRemove]
  );

  const currentLayout = layouts[activeBreakpoint] || [];

  return (
    <div className={clsx("dashboard-grid-container h-full", className)}>
      <ResponsiveGridLayout
        {...commonProps}
        breakpoints={actualBreakpoints}
        cols={actualCols}
        layouts={rglLayouts}
      >
        {currentLayout.map((layoutItem: WidgetLayout) => {
          const widgetDef = widgetMap.get(layoutItem.id);
          if (!widgetDef) return null;

          const Component = widgetDef.component;
          const key = layoutItem.key || layoutItem.id;

          return (
            <div key={key} className="dashboard-grid-item">
              <WidgetWrapper
                widgetId={key}
                onRemove={handleRemoveWidget}
                layoutLock={layoutLock}
                dragHandle={dragHandle}
                dragHandleOnHover={dragHandleOnHover}
              >
                <Component {...(widgetDef.props || {})} />
              </WidgetWrapper>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};
