import type{ ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  renderPrefix?: (item: BreadcrumbItem) => ReactNode;
  renderSuffix?: (item: BreadcrumbItem) => ReactNode;
}
