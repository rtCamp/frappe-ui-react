import React, { ReactNode, useCallback, useMemo } from "react";
import { Toast } from "@base-ui/react/toast";
import DOMPurify from "dompurify";
import LoadingIndicator from "../loadingIndicator";
import { ToastOptions, ToastPromiseOptions } from "./types";
import { ToastAPI, ToastContext } from "./context";
import ToastComponent from "./toast";

interface ToastsProviderProps {
  children: ReactNode;
}

let toastIdCounter = 0;
const ToastsProvider: React.FC<ToastsProviderProps> = ({ children }) => {
  const toastManager = Toast.createToastManager();

  return (
    <Toast.Provider toastManager={toastManager}>
      <ToastContextProvider>{children}</ToastContextProvider>
    </Toast.Provider>
  );
};

const ToastContextProvider: React.FC<ToastsProviderProps> = ({ children }) => {
  const toastManager = Toast.useToastManager();

  const create = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${toastIdCounter++}`;
      const durationInMs =
        options.duration != null ? options.duration * 1000 : 5000;

      const sanitizedMessage = DOMPurify.sanitize(options.message, {
        ALLOWED_TAGS: ["a", "em", "strong", "i", "b", "u"],
      });

      return toastManager.add({
        id: options?.id || id,
        timeout: durationInMs,
        description: sanitizedMessage,
        type: options.type || "info",
        actionProps: {
          children: options.action?.label,
          onClick: options.action?.onClick,
        },
        data: {
          icon: options.icon,
          closable: options.closable,
        },
      });
    },
    [toastManager]
  );

  const remove = useCallback(
    (id: string) => {
      toastManager.close(id);
    },
    [toastManager]
  );

  const promise = useCallback(
    async <TData = any, TError = any>(
      promiseToResolve: Promise<TData>,
      options: ToastPromiseOptions<TData, TError>
    ): Promise<TData> => {
      return toastManager.promise(promiseToResolve, {
        loading: {
          description: options.loading,
          type: "info",
          timeout: (options.duration ?? 0) * 1000,
          data: {
            icon: <LoadingIndicator className="text-ink-white size-4" />,
            closable: false,
          },
        },
        success: (data) => ({
          description:
            typeof options.success === "function"
              ? options.success(data)
              : options.success,
          type: "success",
          timeout: (options.successDuration ?? options.duration ?? 5) * 1000,
          data: {
            icon: undefined as React.ReactNode,
            closable: true,
          },
        }),
        error: (error) => ({
          description:
            typeof options.error === "function"
              ? options.error(error as TError)
              : options.error,
          type: "error",
          timeout: (options.errorDuration ?? options.duration ?? 5) * 1000,
          data: {
            icon: undefined as React.ReactNode,
            closable: true,
          },
        }),
      });
    },
    [toastManager]
  );

  const removeAll = useCallback(() => {
    toastManager.toasts.forEach((toast) => toastManager.close(toast.id));
  }, [toastManager]);

  const success = useCallback(
    (message: string, options: Omit<ToastOptions, "message" | "type"> = {}) =>
      create({ message, type: "success", ...options }),
    [create]
  );
  const error = useCallback(
    (message: string, options: Omit<ToastOptions, "message" | "type"> = {}) =>
      create({ message, type: "error", ...options }),
    [create]
  );
  const warning = useCallback(
    (message: string, options: Omit<ToastOptions, "message" | "type"> = {}) =>
      create({ message, type: "warning", ...options }),
    [create]
  );
  const info = useCallback(
    (message: string, options: Omit<ToastOptions, "message" | "type"> = {}) =>
      create({ message, type: "info", ...options }),
    [create]
  );

  const api: ToastAPI = useMemo(
    () => ({
      create,
      remove,
      removeAll,
      promise,
      success,
      error,
      warning,
      info,
    }),
    [create, remove, removeAll, promise, success, error, warning, info]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-0 items-end right-0 flex flex-col p-5 gap-[10px] w-auto max-w-full z-[2147483647] outline-none pointer-events-none">
          {/* Refactor this component next */}
          {toastManager.toasts.map((toast) => (
            <ToastComponent {...toast} />
          ))}
        </Toast.Viewport>
      </Toast.Portal>
    </ToastContext.Provider>
  );
};

export default ToastsProvider;
