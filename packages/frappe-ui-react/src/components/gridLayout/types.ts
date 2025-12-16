export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  isDraggable?: boolean;
  isResizable?: boolean;
  static?: boolean;
}

export interface Layouts {
  [breakpoint: string]: Layout[];
}

export interface GridLayoutProps {
  layout: Layouts;
  cols?: number;
  rowHeight?: number;
  disabled?: boolean;
}
