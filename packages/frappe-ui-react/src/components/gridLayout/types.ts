import { ReactNode } from "react";
import { Layouts, Layout as RGL_Layout } from "react-grid-layout";

export type Layout = RGL_Layout;

export interface GridLayoutProps {
  layout: Layouts;
  cols?: number;
  rowHeight?: number;
  disabled?: boolean;
  renderItem: (props: { index: number; item: Layout }) => ReactNode;
}
