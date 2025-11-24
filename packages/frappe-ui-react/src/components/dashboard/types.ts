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

export interface DashboardProps {
  layout: LayoutItem[];
  setLayout: (layout: LayoutItem[] | ((prevLayout: LayoutItem[]) => LayoutItem[])) => void;
}

export interface LayoutContainerProps {
  layout: LayoutItem[];
  setLayout: (layout: LayoutItem[] | ((prevLayout: LayoutItem[]) => LayoutItem[])) => void;
}

export interface DashboardRowProps {
  layout: ContainerElement;
}

export interface DashboardStackProps {
  layout: ContainerElement;
}

export interface LayoutBoxProps {
  layout: ContainerElement;
  orientation: "horizontal" | "vertical";
}

export interface WidgetProps {
  layout: ComponentElement;
}
