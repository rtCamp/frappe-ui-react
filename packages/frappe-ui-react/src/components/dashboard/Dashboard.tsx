import React, { useCallback, useMemo } from "react";
// react-grid-layout's type definitions use `export =` syntax, but the runtime
// supports named exports. We rely on the runtime shape here.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error react-grid-layout type definitions don't expose named exports
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type {
  DashboardProps,
  DashboardWidget,
  DashboardLayoutItem,
} from "./types";
import type { Layouts, Layout } from "../gridLayout/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const mapWidgetsById = (widgets: DashboardWidget[]) =>
  new Map(widgets.map((w) => [w.id, w] as const));

const Dashboard: React.FC<DashboardProps> = ({
  widgets,
  layout,
  onLayoutChange,
  className,
}) => {
  const widgetsById = useMemo(() => mapWidgetsById(widgets), [widgets]);

  const layouts: Layouts = useMemo(() => {
    const lg: Layout[] = layout.map((item) => {
      const widget = widgetsById.get(item.widgetId);

      const base: Layout = {
        i: item.widgetId,
        x: item.x,
        y: item.y,
        w: item.w ?? widget?.defaultSize.w ?? 2,
        h: item.h ?? widget?.defaultSize.h ?? 2,
      };

      if (widget?.minSize) {
        base.minW = widget.minSize.w;
        base.minH = widget.minSize.h;
      }

      if (widget?.maxSize) {
        base.maxW = widget.maxSize.w;
        base.maxH = widget.maxSize.h;
      }

      if (widget?.movable === false) {
        base.isDraggable = false;
        base.static = true;
      }

      if (widget?.resizable === false) {
        base.isResizable = false;
      }

      return base;
    });

    return { lg };
  }, [layout, widgetsById]);

  const handleLayoutChange = useCallback(
    (_current: Layout[], allLayouts: Layouts) => {
      if (!onLayoutChange) return;

      const lgLayout = (allLayouts.lg ?? []) as Layout[];

      const next: DashboardLayoutItem[] = lgLayout.map((item) => ({
        widgetId: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      }));

      onLayoutChange(next);
    },
    [onLayoutChange]
  );

  return (
    <ResponsiveGridLayout
      className={`frappe-dashboard-grid ${className ?? ""}`}
      layouts={layouts}
      cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
      rowHeight={52}
      margin={[0, 0]}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      isDraggable
      isResizable
      verticalCompact
      preventCollision={false}
      useCSSTransforms
      onLayoutChange={handleLayoutChange}
    >
      {widgets.map((widget) => {
        const WidgetComponent = widget.component;
        return (
          <div key={widget.id}>
            <WidgetComponent />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default Dashboard;


