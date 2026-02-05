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
  savedLayout,
  onLayoutChange,
  initialLayout,
  ...rest
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

  return <LayoutContainer layout={layout} setLayout={setLayout} {...rest} />;
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
