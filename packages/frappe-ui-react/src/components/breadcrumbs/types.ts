import type { ReactNode } from "react";
import type { useRender } from "@base-ui/react/use-render";
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
  /**
   * Replace the default `<Dropdown>` wrapper of a crumb that has `dropdown`
   * set. Accepts a React element or a render function that receives the
   * merged props (`children` is the crumb trigger) and the crumb's `state`.
   */
  renderDropdown?: useRender.RenderProp<BreadcrumbDropdownState>;
}

export type BreadcrumbDropdownState = {
  item: BreadcrumbItem;
};
