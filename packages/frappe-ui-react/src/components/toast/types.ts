import { ToastObject } from "@base-ui/react";
import type { ReactNode } from "react";

export interface ToastActionProps {
  label: string;
  onClick: () => void;
  altText?: string;
}

export interface ToastProps {
  toast: ToastObject<ToastDataInternal>;
}

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastActionProps {
  label: string;
  onClick: () => void;
  altText?: string;
}

export interface ToastOptions {
  onOpenChange?: (open: boolean) => void;
  type?: ToastType;
  icon?: ReactNode;
  closable?: boolean;
  duration?: number;
  action?: ToastActionProps;
  id?: string;
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

export interface ToastDataInternal {
  icon?: ReactNode;
  closable?: boolean;
}
