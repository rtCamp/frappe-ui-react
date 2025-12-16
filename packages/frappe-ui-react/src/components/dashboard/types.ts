import type React from "react";

export interface DashboardWidget {
  id: string;
  component: React.ComponentType<any>;
  defaultSize: { w: number; h: number };
  minSize?: { w: number; h: number };
  maxSize?: { w: number; h: number };
  movable?: boolean;
  resizable?: boolean;
  removable?: boolean;
}

export interface DashboardLayoutItem {
  widgetId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardProps {
  widgets: DashboardWidget[];
  layout: DashboardLayoutItem[];
  onLayoutChange?: (layout: DashboardLayoutItem[]) => void;
  className?: string;
}


