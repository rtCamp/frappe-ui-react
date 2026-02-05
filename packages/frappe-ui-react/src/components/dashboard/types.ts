interface ComponentElement {
  id: string;
  type: 'component';
  component: React.ReactNode;
  width?: string;
  height?: string;
  flex?: string;
  locked?: boolean;
}

interface EmptySlot {
  id: string;
  type: 'empty';
  width?: string;
  height?: string;
  flex?: string;
  locked?: boolean;
}

interface ContainerElement {
  id: string;
  type: 'row' | 'stack';
  slots: LayoutItem[];
  width?: string;
  height?: string;
  flex?: string;
  gap?: string;
  locked?: boolean;
  className?: string;
}

export type LayoutItem = ComponentElement | ContainerElement | EmptySlot;

export type SerializedLayoutItem = Omit<ComponentElement, 'component'> | EmptySlot | {
  id: string;
  type: 'row' | 'stack';
  slots: SerializedLayoutItem[];
  width?: string;
  height?: string;
  flex?: string;
  locked?: boolean;
  gap?: string;
  className?: string;
};;

export interface DashboardProps {
  initialLayout: LayoutItem;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
  savedLayout?: SerializedLayoutItem;
  onLayoutChange: (layout: SerializedLayoutItem) => void;
}

export interface LayoutContainerProps {
  layout: LayoutItem;
  setLayout: (layout: LayoutItem | ((prevLayout: LayoutItem) => LayoutItem)) => void;
  layoutLock?: boolean;
  dragHandle?: boolean;
  dragHandleOnHover?: boolean;
}

export interface LayoutBoxProps {
  layout: ContainerElement;
  orientation: "horizontal" | "vertical";
  parentLocked?: boolean;
}

export interface LayoutRendererProps {
  layout: LayoutItem;
  parentLocked?: boolean;
}

export interface SlotContainerProps {
  slotId: string;
  slotItem: LayoutItem;
  isDragging: boolean;
  parentLocked?: boolean;
}

export interface WidgetProps {
  layout: ComponentElement;
  parentLocked?: boolean;
}

export interface LayoutContextValue {
  activeSlotId: string | null;
  layoutLock: boolean;
  dragHandle: boolean;
  dragHandleOnHover: boolean;
}