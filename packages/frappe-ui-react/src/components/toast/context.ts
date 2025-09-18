import { createContext } from "react";
import type { ToastOptions, ToastPromiseOptions } from "./types";

export interface ToastAPI {
  create: (options: ToastOptions) => string;
  remove: (id: string) => void;
  removeAll: () => void;
  promise: <TData = any, TError = any>(
    promiseToResolve: Promise<TData>,
    options: ToastPromiseOptions<TData, TError>,
  ) => Promise<TData>;
  success: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => string;
  error: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => string;
  warning: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => string;
  info: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => string;
}

export const ToastContext = createContext<ToastAPI | undefined>(undefined);