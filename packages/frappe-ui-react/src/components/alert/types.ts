import type { ReactNode } from "react";

export interface AlertProps {
  title: string;
  theme?: "yellow" | "blue" | "red" | "green" | "default";
  variant?: "subtle" | "outline";
  description?: string | ((args?: unknown) => ReactNode);
  dismissable?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  icon?: false | ((args?: unknown) => ReactNode);
  footer?: (args?: unknown) => ReactNode;
  className?: string;
}
