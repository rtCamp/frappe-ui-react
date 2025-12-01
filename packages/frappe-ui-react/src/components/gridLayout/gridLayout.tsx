import React, { useState, useMemo, useEffect, ReactNode } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { GridLayoutProps } from "./types";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface MyGridLayoutProps extends GridLayoutProps {
  renderItem: (props: { index: number; item: Layout }) => ReactNode;
}

const GridLayout: React.FC<MyGridLayoutProps> = ({
  layout: initialLayout,
  cols = 12,
  rowHeight = 52,
  disabled = false,
  renderItem,
}) => {
  const [layout, setLayout] = useState<Layouts>(initialLayout);
  const [layoutReady, setLayoutReady] = useState(false);
  useEffect(() => {
    setLayout(initialLayout);
    setLayoutReady(true);
  }, [initialLayout]);

  useEffect(() => {
    setLayoutReady(true);
  }, []);

  const options = useMemo(() => {
    return {
      isDraggable: !disabled,
      isResizable: !disabled,
      margin: [0, 0] as [number, number],
      rowHeight: rowHeight,
      responsive: true,
      verticalCompact: true,
      preventCollision: false,
      useCSSTransforms: true,
      cols: { lg: cols, md: cols, sm: cols, xs: 1, xxs: 1 },
    };
  }, [cols, rowHeight, disabled]);

  const onLayoutChange = (_: Layout[], newLayout: Layouts) => {
    setLayout(newLayout);
  };

  return (
    <ResponsiveGridLayout
      layouts={layout}
      onLayoutChange={onLayoutChange}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      {...options}
    >
      {Object.values(layout)
        .flat()
        .map((l, index) => (
          <div key={l.i} data-grid={l}>
            {layoutReady &&
              renderItem({
                index,
                item: l,
              })}
          </div>
        ))}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
