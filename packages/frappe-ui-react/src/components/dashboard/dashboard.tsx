/**
 * External dependencies.
 */
import React, { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { LayoutContainer } from "./layoutContainer";
import { validateSerializedLayout } from "./dashboardUtil";
import type { DashboardProps, DashboardLayout } from "./types";

export const Dashboard: React.FC<DashboardProps> = ({
  widgets,
  layoutFlow = "row",
  initialLayout,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  savedLayout,
  onLayoutChange,
}) => {
  const [layout, setLayout] = useState<DashboardLayout>(() => {
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
      layoutFlow={layoutFlow}
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
