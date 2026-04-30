import type { ReactNode } from "react";

export interface AlertProps {
  /** The title of the alert */
  title: string;
  /** Color theme of the alert */
  theme?: "yellow" | "blue" | "red" | "green" | "default";
  /** Visual variant of the alert */
  variant?: "subtle" | "outline";
  /** Description text displayed below the title, can be a string or a render function for dynamic content */
  renderDescription?: string | ((args?: unknown) => ReactNode);
  /** Whether the alert can be dismissed by the user */
  dismissable?: boolean;
  /** Controls the visibility of the alert (controlled mode) */
  visible?: boolean;
  /** Callback when the visibility of the alert changes (for controlled mode) */
  onVisibleChange?: (visible: boolean) => void;
  /** Custom icon to display in the alert */
  renderIcon?: false | ((args?: unknown) => ReactNode);
  /** Custom footer content for the alert */
  renderFooter?: (args?: unknown) => ReactNode;
  /** Additional CSS classes to apply to the alert container */
  className?: string;
}
