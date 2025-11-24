import React from "react";
import { LayoutContainer } from "./layoutContainer";
import type { DashboardProps } from "./types";

export type { DashboardProps };

export const Dashboard: React.FC<DashboardProps> = ({ layout, setLayout }) => {
  return (
    <LayoutContainer 
      layout={layout}
      setLayout={setLayout}
    />
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
