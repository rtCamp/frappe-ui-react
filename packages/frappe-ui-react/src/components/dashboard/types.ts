export interface Widget {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

export type Layout = string[][];

export interface DashboardProps {
  widgets: Widget[];
  initialLayout: Layout;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  savedLayout?: Layout;
  onLayoutChange?: (layout: Layout) => void;
}

export interface LayoutContainerProps {
  widgets: Widget[];
  layout: Layout;
  setLayout: (layout: Layout) => void;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
}

export interface RowProps {
  widgets: Widget[];
  row: string[];
  rowIndex: number;
  parentLocked?: boolean;
  onAddWidget: (rowIndex: number, slotIndex: number, widgetId: string) => void;
  onRemoveWidget: (rowIndex: number, slotIndex: number) => void;
}

export interface SlotProps {
  widgets: Widget[];
  widgetId: string;
  slotId: string;
  parentLocked?: boolean;
  onAddWidget: (widgetId: string) => void;
  onRemoveWidget: () => void;
}

export interface LayoutContextValue {
  activeSlotId: string | null;
  layoutLock: boolean;
  dragHandle: boolean;
  dragHandleOnHover: boolean;
}