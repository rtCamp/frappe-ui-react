/**
 * External dependencies.
 */
import { useCallback, useMemo, useEffect, useState } from "react";
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
import type { LayoutContainerProps, WidgetLayout } from "./types";
import { useDashboardContext } from "./dashboardContext";
import React from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  widgets,
  layout,
  setLayout,
  onDrop,
  onRemove,
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
  const context = useDashboardContext();
  const [isMounted, setIsMounted] = useState(false);

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

  const rglLayout: RGLLayout[] = useMemo(
    () =>
      layout.map((item) => ({
        i: item.key || item.id,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
        maxW: item.maxW,
        maxH: item.maxH,
        static: item.static,
        isDraggable: item.isDraggable,
        isResizable: item.isResizable,
      })),
    [layout]
  );

  const handleLayoutChange = useCallback(
    (newLayout: RGLLayout[]) => {
      if (layoutLock || !setLayout) return;

      const layoutMap = new Map(newLayout.map((item) => [item.i, item]));
      const updatedLayout: WidgetLayout[] = layout.map((item) => {
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
      });
      setLayout(updatedLayout);
    },
    [layout, setLayout, layoutLock]
  );

  const handleDrop = useCallback(
    (layoutItem: RGLLayout[], item: RGLLayout, e: Event) => {
      if (!onDrop) return;

      let widgetData = context?.draggingWidget;

      // Fallback to dataTransfer if no context
      if (!widgetData) {
        const dataTransfer = (e as any).dataTransfer;
        if (!dataTransfer) return;

        try {
          widgetData = JSON.parse(dataTransfer.getData("text/plain"));
        } catch (err) {
          console.error("Error parsing drop data:", err);
          return;
        }
      }

      if (widgetData?.widgetId) {
        onDrop(widgetData.widgetId, {
          x: item.x,
          y: item.y,
          w: widgetData.w || 4,
          h: widgetData.h || 3,
        });
      }

      if (context) {
        context.setDraggingWidget(null);
      }
    },
    [onDrop, context]
  );

  const commonProps = {
    className: clsx("layout", {
      "react-grid-layout-no-transition": !isMounted,
    }),
    rowHeight,
    margin,
    onDragStop: handleLayoutChange,
    onResizeStop: handleLayoutChange,
    onDrop: onDrop ? handleDrop : undefined,
    isDroppable: Boolean(onDrop),
    droppingItem: onDrop
      ? {
          i: "__dropping-elem__",
          w: context?.draggingWidget?.w || 4,
          h: context?.draggingWidget?.h || 3,
        }
      : undefined,
    isBounded,
    isDraggable: !layoutLock,
    isResizable: !layoutLock,
    draggableHandle: dragHandle ? ".dashboard-drag-handle" : undefined,
    draggableCancel: ".dashboard-drag-cancel",
    compactType,
    preventCollision: false,
    useCSSTransforms: true,
  };

  return (
    <div className={clsx("dashboard-grid-container", className)}>
      <ResponsiveGridLayout
        {...commonProps}
        breakpoints={actualBreakpoints}
        cols={actualCols}
        layouts={{ lg: rglLayout }}
      >
        {layout.map((layoutItem) => {
          const widgetDef = widgetMap.get(layoutItem.id);
          if (!widgetDef) return null;

          const Component = widgetDef.component;
          const key = layoutItem.key || layoutItem.id;

          return (
            <div key={key} className="dashboard-grid-item">
              <WidgetWrapper
                widgetId={key}
                onRemove={onRemove}
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
