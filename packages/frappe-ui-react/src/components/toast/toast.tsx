import React, { useMemo } from "react";
import { Toast } from "@base-ui/react/toast";
import { CircleCheck, AlertTriangle, Info, X } from "lucide-react";

import type { ToastProps } from "./types";

const ToastComponent: React.FC<ToastProps> = ({ toast }) => {
  const icon = toast.data?.icon;
  const type = toast.type || "success";
  const closable = toast.data?.closable ?? true;

  const iconComponent = useMemo(() => {
    if (icon) return icon;

    switch (type) {
      case "success":
        return (
          <CircleCheck className="flex-shrink-0 size-4 text-ink-green-3 dark:text-green-700" />
        );
      case "warning":
        return (
          <AlertTriangle className="flex-shrink-0 size-4 text-ink-amber-3 dark:text-amber-700" />
        );
      case "error":
        return (
          <Info className="flex-shrink-0 size-4 text-ink-red-4 dark:text-red-700" />
        );
      default:
        return null;
    }
  }, [icon, type]);

  return (
    <Toast.Root
      toast={toast}
      swipeDirection={closable === false ? [] : "down"}
      className="toast-root-animatable"
    >
      <Toast.Content className="bg-surface-gray-6 dark:bg-gray-900 text-ink-white dark:text-white border-none rounded-md px-4 py-1.5 shadow-lg flex items-center justify-between gap-3 min-w-[280px] max-w-[400px] pointer-events-auto list-none">
        <div className="flex items-center gap-2 flex-grow overflow-hidden">
          {iconComponent}
          <div className="flex flex-col flex-grow overflow-hidden">
            <Toast.Description className="text-p-sm break-words text-ink-white" />
          </div>
        </div>
        <div className="flex items-center gap-2 h-7">
          <Toast.Action className="flex-shrink-0 rounded px-2 py-1 text-sm text-ink-blue-link dark:text-gray-300 hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4" />
          {closable && (
            <Toast.Close
              className="flex-shrink-0 rounded p-1 text-ink-white dark:text-gray-300 hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4"
              aria-label="Close"
            >
              <X className="size-4" />
            </Toast.Close>
          )}
        </div>
      </Toast.Content>
      <style>
        {`
          .toast-root-animatable {
            transition:
              transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          }

          /* Enter animation */
          .toast-root-animatable[data-starting-style] {
            opacity: 0;
            transform: translateY(150%) scale(0.95);
          }

          /* Exit animation */
          .toast-root-animatable[data-ending-style] {
            opacity: 0;
            transform: translateY(150%) scale(0.95);
          }

          /* Swipe exit directions */
          .toast-root-animatable[data-ending-style][data-swipe-direction='down'] {
            transform: translateY(calc(var(--toast-swipe-movement-y) + 150%));
          }

          .toast-root-animatable[data-ending-style][data-swipe-direction='up'] {
            transform: translateY(calc(var(--toast-swipe-movement-y) - 150%));
          }

          .toast-root-animatable[data-ending-style][data-swipe-direction='left'] {
            transform: translateX(calc(var(--toast-swipe-movement-x) - 150%));
          }

          .toast-root-animatable[data-ending-style][data-swipe-direction='right'] {
            transform: translateX(calc(var(--toast-swipe-movement-x) + 150%));
          }

          /* Swipe in progress */
          .toast-root-animatable[data-swiping] {
            transform: translateY(var(--toast-swipe-movement-y)) translateX(var(--toast-swipe-movement-x));
            transition: none;
          }
        `}
      </style>
    </Toast.Root>
  );
};

export default ToastComponent;
