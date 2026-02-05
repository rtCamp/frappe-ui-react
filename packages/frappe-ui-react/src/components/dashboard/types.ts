interface ComponentElement<P = Record<string, unknown>> {
  id: string;
  type: 'component';
  component: React.ComponentType<P>;
  props: P;
  width?: string;
  height?: string;
  flex?: string;
}

interface EmptySlot {
  id: string;
  type: 'empty';
  width?: string;
  height?: string;
  flex?: string;
}

interface ContainerElement {
  id: string;
  type: 'row' | 'stack';
  slots: LayoutItem[];
  width?: string;
  height?: string;
  flex?: string;
}

export type LayoutItem = ComponentElement | ContainerElement | EmptySlot;

export type SerializedLayoutItem = Omit<ComponentElement, 'component' | 'props'> | EmptySlot | {
  id: string;
  type: 'row' | 'stack';
  slots: SerializedLayoutItem[];
  width?: string;
  height?: string;
  flex?: string;
};

export interface DashboardProps {
  initialLayout: LayoutItem;
  savedLayout?: SerializedLayoutItem;
  onLayoutChange: (layout: SerializedLayoutItem) => void;
}

export interface LayoutContainerProps {
  layout: LayoutItem;
  setLayout: (layout: LayoutItem | ((prevLayout: LayoutItem) => LayoutItem)) => void;
}

export interface LayoutBoxProps {
  layout: ContainerElement;
  orientation: "horizontal" | "vertical";
  activeParentId?: string | null;
  activeSlotId?: string | null;
}

export interface LayoutRendererProps {
  layout: LayoutItem;
  activeParentId?: string | null;
  activeSlotId?: string | null;
}

export interface SlotContainerProps {
  slotId: string;
  slotItem: LayoutItem;
  isDragging: boolean;
  activeSlotId?: string | null;
  activeParentId?: string | null;
}

export interface WidgetProps {
  layout: ComponentElement;
}
