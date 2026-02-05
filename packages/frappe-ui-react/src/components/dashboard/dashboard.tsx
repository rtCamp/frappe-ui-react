import React, { useEffect, useState } from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps, Layout } from "./types";
import { validateSerializedLayout } from "./dashboardUtil";

export const Dashboard: React.FC<DashboardProps> = ({
  widgets,
  initialLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  savedLayout,
  onLayoutChange,
}) => {
  const [layout, setLayout] = useState<Layout>(() => {
    if (savedLayout && validateSerializedLayout(savedLayout)) {
      return savedLayout;
    }
    return initialLayout;
  });

  useEffect(() => {
    if (savedLayout && validateSerializedLayout(savedLayout)) {
      setLayout(savedLayout);
    }
  }, [savedLayout]);

  useEffect(() => {
    onLayoutChange?.(layout);
  }, [layout, onLayoutChange]);

  return (
    <LayoutContainer
      widgets={widgets}
      layout={layout}
      setLayout={setLayout}
      layoutLock={layoutLock}
      dragHandle={dragHandle}
      dragHandleOnHover={dragHandleOnHover}
    />
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
