import type { ReactNode } from "react";

export interface ToastActionProps {
  label: string;
  onClick: () => void;
  altText?: string;
}

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  type?: ToastType;
  icon?: ReactNode;
  closable?: boolean;
  duration?: number;
  action?: ToastActionProps;
  id: string;
}

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastActionProps {
  label: string;
  onClick: () => void;
  altText?: string;
}

export interface ToastOptions
  extends Omit<Partial<ToastProps>, "open" | "message"> {
  message: string;
}

export interface ToastPromiseOptions<TData = any, TError = any> {
  loading: string;
  success: string | ((data: TData) => string);
  error: string | ((error: TError) => string);
  successDuration?: number;
  errorDuration?: number;
  duration?: number;
}
