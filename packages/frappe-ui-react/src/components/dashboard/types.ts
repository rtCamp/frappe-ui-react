import type { Layout as RGLLayout } from "react-grid-layout";

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs";

export interface WidgetSize {
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  isResizable?: boolean;
}

export type WidgetSizePresets = Record<string, WidgetSize>;

export interface WidgetLayout {
  id: string;
  key?: string;
  x?: number;
  y?: number;
  size?: string;
  w?: number;
  h?: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export type WidgetRow = Array<string | WidgetLayout>;
export type DashboardLayout = WidgetRow[];

export type DashboardLayouts = {
  [key in Breakpoint]?: WidgetLayout[];
};

export type WidgetLayouts = {
  [key in Breakpoint]?: DashboardLayout;
};

export interface WidgetDefinition {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
  size?: string;
  isResizable?: boolean;
  isDraggable?: boolean;
  static?: boolean;
  preview?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: Record<string, any>;
    description?: string;
  };
}

export interface DashboardProps {
  widgets: WidgetDefinition[];
  initialLayouts?: WidgetLayouts;
  savedLayout?: DashboardLayouts;
  onLayoutChange?: (layout: DashboardLayouts) => void;
  sizes?: WidgetSizePresets;
  breakpoints?: { [key in Breakpoint]?: number };
  cols?: { [key in Breakpoint]?: number };
  rowHeight?: number;
  margin?: [number, number];
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  compactType?: "vertical" | "horizontal" | null;
  isBounded?: boolean;
  className?: string;
}

export interface LayoutContainerProps {
  widgets: WidgetDefinition[];
  layouts: DashboardLayouts;
  setLayouts?: (layouts: DashboardLayouts) => void;
  onDrop?: (
    widgetId: string,
    layout: { x: number; y: number; w: number; h: number },
    currentLayout?: RGLLayout[]
  ) => void;
  onRemove?: (widgetId: string) => void;
  sizes?: WidgetSizePresets;
  breakpoints?: { [key in Breakpoint]?: number };
  cols?: { [key in Breakpoint]?: number };
  rowHeight?: number;
  margin?: [number, number];
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  compactType?: "vertical" | "horizontal" | null;
  isBounded?: boolean;
  className?: string;
}

export interface WidgetWrapperProps {
  widgetId: string;
  onRemove?: (widgetId: string) => void;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  children: React.ReactNode;
}

export interface DashboardWidgetGalleryProps {
  title?: string;
  description?: string;
  className?: string;
  view?: "list" | "grid";
  mode?: "drag" | "click" | "both";
  filterWidgets?: (widgets: WidgetDefinition[]) => WidgetDefinition[];
  onWidgetAdd?: (widgetId: string) => void;
  onWidgetDrop?: (widgetId: string) => void;
}

export interface DashboardWidgetGalleryItemProps {
  widget: WidgetDefinition;
  view?: "list" | "grid";
  mode?: "drag" | "click" | "both";
  onWidgetAdd?: (widgetId: string) => void;
  onWidgetDrop?: (widgetId: string) => void;
}

export type GridLayoutItem = RGLLayout;
