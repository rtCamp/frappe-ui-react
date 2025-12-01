export interface Slot {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  flex?: string;
  locked?: boolean;
}

export interface Row {
  id: string;
  slots: Slot[];
  gap?: string;
  className?: string;
  locked?: boolean;
}

export type Layout = Row[];

export interface SerializedSlot {
  id: string;
  flex?: string;
  locked?: boolean;
}

export interface SerializedRow {
  id: string;
  slots: SerializedSlot[];
  gap?: string;
  className?: string;
  locked?: boolean;
}

export type SerializedLayout = SerializedRow[];

export interface DashboardProps {
  initialLayout: Layout;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  savedLayout?: SerializedLayout;
  onLayoutChange: (layout: SerializedLayout) => void;
}

export interface LayoutContainerProps {
  layout: Layout;
  setLayout: (layout: Layout | ((prevLayout: Layout) => Layout)) => void;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
}

export interface RowProps {
  row: Row;
  parentLocked?: boolean;
}

export interface DroppableProps {
  slotId: string;
  slot: Slot;
  parentLocked?: boolean;
}

export interface DraggableProps {
  slot: Slot;
  parentLocked?: boolean;
}

export interface LayoutContextValue {
  activeSlotId: string | null;
  layoutLock: boolean;
  dragHandle: boolean;
  dragHandleOnHover: boolean;
}