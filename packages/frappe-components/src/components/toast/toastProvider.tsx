import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import DOMPurify from "dompurify";
import LoadingIndicator from "../loadingIndicator";
import { ToastProps, ToastOptions, ToastPromiseOptions } from "./types";
import { ToastContext } from "./context";
import ToastComponent from "./toast";

interface ToastsProviderProps {
  children: ReactNode;
}
let toastIdCounter = 0;
const ToastsProvider: React.FC<ToastsProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const create = useCallback((options: ToastOptions): string => {
    const id = `toast-${toastIdCounter++}`;
    const durationInMs =
      options.duration != null ? options.duration * 1000 : 5000;

    const sanitizedMessage = DOMPurify.sanitize(options.message, {
      ALLOWED_TAGS: ["a", "em", "strong", "i", "b", "u"],
    });

    const toastItem: ToastProps = {
      id: options?.id || id,
      open: true,
      message: sanitizedMessage,
      type: options.type || "info",
      duration: durationInMs,
      action: options.action,
      icon: options.icon,
      closable: options.closable ?? true,
      onOpenChange: () => null,
    };

    setToasts((prev) => [...prev, toastItem]);
    return toastItem.id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToastInState = useCallback(
    (id: string, updates: Partial<Omit<ToastProps, "id">>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates, open: true } : t))
      );
    },
    []
  );

  const promise = useCallback(
    async <TData = any, TError = any>(
      promiseToResolve: Promise<TData>,
      options: ToastPromiseOptions<TData, TError>
    ): Promise<TData> => {
      const loadingDurationInSeconds = options.duration ?? 0;
      const toastId = create({
        message: options.loading,
        type: "info",
        icon: <LoadingIndicator className="text-ink-white size-4" />,
        duration: loadingDurationInSeconds,
        closable: false,
      });

      try {
        const data = await promiseToResolve;
        const successMessage =
          typeof options.success === "function"
            ? options.success(data)
            : options.success;
        const successToastDurationInSeconds =
          options.successDuration ?? options.duration ?? 5;

        updateToastInState(toastId, {
          message: successMessage,
          type: "success",
          duration: successToastDurationInSeconds * 1000,
          icon: undefined,
          closable: true,
        });
        return data;
      } catch (error) {
        const errorMessage =
          typeof options.error === "function"
            ? options.error(error as TError)
            : options.error;
        const errorToastDurationInSeconds =
          options.errorDuration ?? options.duration ?? 5;

        updateToastInState(toastId, {
          message: errorMessage,
          type: "error",
          duration: errorToastDurationInSeconds * 1000,
          icon: undefined,
          closable: true,
        });
        throw error;
      }
    },
    [create, updateToastInState]
  );

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

  const api = useMemo(
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
    <ToastProvider swipeDirection="down">
      <ToastContext.Provider value={api}>
        {children}
        {toasts.map((t) => (
          <ToastComponent
            {...t}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                remove(t.id);
              }
            }}
          />
        ))}
        <ToastViewport className="fixed bottom-0 items-end right-0 flex flex-col p-5 gap-[10px] w-auto max-w-full z-[2147483647] outline-none pointer-events-none" />
      </ToastContext.Provider>
    </ToastProvider>
  );
};

export default ToastsProvider;
