import { ButtonProps } from "../button";

export interface DialogActionContext {
  close: () => void;
}


export type DialogAction = Omit<ButtonProps, 'onClick'> & {
  label: string;
  onClick?: (context: DialogActionContext) => void | Promise<void>;
};

export interface DialogActionButtonProps {
  action: DialogAction;
  close: () => void;
}

export interface DialogOptions {
  title?: (() => React.ReactNode) | string;
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

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options?: DialogOptions;
  disableOutsideClickToClose?: boolean;
  onAfterLeave?: () => void;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}