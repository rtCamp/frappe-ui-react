import type { ReactNode } from "react";
import type { DropdownProps } from "../dropdown";

export interface BreadcrumbItem {
  id?: string | number;
  label: string;
  onClick?: () => void;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  dropdown?: DropdownProps;
  interactive?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  size?: "sm" | "md" | "lg";
  highlightLastItem?: boolean;
  highlightAllItems?: boolean;
  compactCrumbs?: boolean;
  className?: string;
  crumbClassName?: string;
  separatorClassName?: string;
  renderPrefix?: (item: BreadcrumbItem) => ReactNode;
  renderSuffix?: (item: BreadcrumbItem) => ReactNode;
}
