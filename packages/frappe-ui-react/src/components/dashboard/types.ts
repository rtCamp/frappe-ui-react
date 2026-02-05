export type WidgetSize = 'small' | 'medium' | 'large';

export interface Widget {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
  supportedSizes: WidgetSize[];
}

export interface LayoutItem {
  widgetId: string;
  size: WidgetSize;
}

export type DashboardLayout = LayoutItem[][];
export interface DashboardProps {
  widgets: Widget[];
  layoutFlow?: "row" | "column";
  initialLayout: DashboardLayout;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  savedLayout?: DashboardLayout;
  onLayoutChange?: (layout: DashboardLayout) => void;
}

export interface LayoutContainerProps {
  widgets: Widget[];
  layout: DashboardLayout;
  layoutFlow?: "row" | "column";
  setLayout: (layout: DashboardLayout) => void;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
}

export interface LayoutProps {
  widgets: Widget[];
  items: LayoutItem[];
  layoutIndex: number;
  layoutFlow?: "row" | "column";
  parentLocked?: boolean;
  onAddWidget: (layoutIndex: number, slotIndex: number, widgetId: string) => void;
  onRemoveWidget: (layoutIndex: number, slotIndex: number) => void;
}

export interface SlotProps {
  widgets: Widget[];
  widgetId: string;
  slotId: string;
  size: WidgetSize;
  parentLocked?: boolean;
  onAddWidget: (widgetId: string) => void;
  onRemoveWidget: () => void;
}

export interface LayoutContextValue {
  activeSlotId: string | null;
  layoutLock: boolean;
  dragHandle: boolean;
  dragHandleOnHover: boolean;
  layout: DashboardLayout;
  checkSizeCompatibility: (activeId: string, overId: string) => boolean;
}