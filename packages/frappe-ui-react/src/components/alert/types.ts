import type { ReactNode } from "react";

export interface AlertProps {
  title: string;
  theme?: "yellow" | "blue" | "red" | "green";
  variant?: "subtle" | "outline";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: string | ((args?: any) => ReactNode);
  dismissable?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer?: (args?: any) => ReactNode;
}
