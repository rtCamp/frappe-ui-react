import type { ReactNode } from "react";
import type { DropdownProps } from "../dropdown";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  dropdown?: DropdownProps;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  size?: "sm" | "md";
  highlightLastItem?: boolean;
  renderPrefix?: (item: BreadcrumbItem) => ReactNode;
  renderSuffix?: (item: BreadcrumbItem) => ReactNode;
}
