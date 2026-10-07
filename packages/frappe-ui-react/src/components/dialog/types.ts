import type { ButtonProps } from "../button";

export interface DialogActionContext {
  close: () => void;
}

export type DialogAction = Omit<ButtonProps, "onClick"> & {
  label: string;
  onClick?: (context: DialogActionContext) => void | Promise<void>;
};

export interface DialogActionButtonProps {
  action: DialogAction;
  close: () => void;
}

export interface DialogOptions {
  title?: (() => React.ReactElement) | string;
  message?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  position?: "center" | "top";
  icon?: {
    name: string;
    appearance?: "info" | "success" | "warning" | "danger";
  };
  actions?: DialogAction[];
}

export interface DialogClassNames {
  /** Class for the full-screen backdrop layer. */
  backdrop?: string;
  /** Class for the scrollable viewport that centers/positions the popup. */
  viewport?: string;
  /** Class for the padded content wrapper that holds the header and body. */
  content?: string;
  /** Class for the header row. */
  header?: string;
  /** Class for the wrapper around the icon and title. */
  titleWrapper?: string;
  /** Class for the title element. */
  title?: string;
  /** Class for the rounded icon background. */
  iconWrapper?: string;
  /** Class for the icon itself. */
  icon?: string;
  /** Class for the close button. */
  closeButton?: string;
  /** Class for the close icon. */
  closeIcon?: string;
  /** Class for the description text rendered when no children are provided. */
  description?: string;
  /** Class for the footer wrapper that holds the actions. */
  footer?: string;
  /** Class for the container wrapping the default action buttons. */
  actions?: string;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options?: DialogOptions;
  disableOutsideClickToClose?: boolean;
  onAfterLeave?: () => void;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  /** Class for the popup (the modal box itself). */
  className?: string;
  /** Per-slot class overrides for the dialog's inner elements. */
  classNames?: DialogClassNames;
}
