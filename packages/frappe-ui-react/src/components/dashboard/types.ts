interface ComponentElement<P = Record<string, unknown>> {
  id: string;
  type: 'component';
  component: React.ComponentType<P>;
  props: P;
}

interface ContainerElement {
  id: string;
  type: 'row' | 'stack';
  elements: LayoutItem[];
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
}

export interface LayoutRendererProps {
  layout: LayoutItem;
}

export interface WidgetProps {
  layout: ComponentElement;
}
