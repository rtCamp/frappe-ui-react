interface ComponentElement<P = Record<string, unknown>> {
  id: string;
  type: 'component';
  component: React.ComponentType<P>;
  props: P;
}

export interface SlotDefinition {
  width?: string;
  height?: string;
  flex?: string;
}

interface ContainerElement {
  id: string;
  type: 'row' | 'stack';
  elements: LayoutItem[];
  slots?: SlotDefinition[];
}

export type LayoutItem = ComponentElement | ContainerElement;

export type SerializedLayoutItem = Omit<ComponentElement, 'component' | 'props'> | {
  id: string;
  type: 'row' | 'stack';
  elements: SerializedLayoutItem[];
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
}

export interface LayoutRendererProps {
  layout: LayoutItem;
  activeParentId?: string | null;
}

export interface SlotContainerProps {
  slotId: string;
  slot: SlotDefinition;
  element: LayoutItem | undefined;
  isDragging: boolean;
  isActiveParent: boolean;
  activeParentId?: string | null;
}

export interface WidgetProps {
  layout: ComponentElement;
}
