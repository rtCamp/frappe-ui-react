import React, { useMemo } from 'react';
import * as Toast from '@radix-ui/react-toast';
import {
  CircleCheck,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import type { ToastProps } from './types';

const ToastComponent: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  message,
  type = 'success',
  icon,
  closable = true,
  duration = 5000,
  action,
}) => {
  const iconComponent = useMemo(() => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return <CircleCheck className="flex-shrink-0 size-4 text-ink-green-2" />;
      case 'warning':
        return <AlertTriangle className="flex-shrink-0 size-4 text-ink-amber-2" />;
      case 'error':
        return <Info className="flex-shrink-0 size-4 text-ink-red-2" />;
      default:
        return null;
    }
  }, [icon, type]);

  const handleAction = () => {
    action?.onClick?.();
  };

  return (
    <Toast.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={closable ? duration : Infinity}
      className="toast-root-animatable bg-surface-gray-6 border-none rounded-md px-4 py-1.5 shadow-lg flex items-center justify-between gap-3 min-w-[280px] max-w-[400px] pointer-events-auto list-none"
    >
      <div className="flex items-center gap-2 flex-grow overflow-hidden">
        {iconComponent}
        <div className="flex flex-col flex-grow overflow-hidden">
          {message && (
            <Toast.Description
              className="text-p-sm break-words text-ink-white"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 h-7">
        {action && (
          <Toast.Action
            className="flex-shrink-0 rounded px-2 py-1 text-sm text-ink-blue-link hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4"
            altText={action.altText || action.label}
            onClick={handleAction}
          >
            {action.label}
          </Toast.Action>
        )}
        {closable && (
          <Toast.Close
            className="flex-shrink-0 rounded p-1 text-ink-white hover:text-ink-gray-3 focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-4"
            aria-label="Close"
          >
            <X className="size-4" />
          </Toast.Close>
        )}
      </div>
      <style>
        {`
        @keyframes KSlideIn {
          from {
            transform: translateY(calc(100% + var(--viewport-padding, 32px))) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes KHide {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(calc(50% + var(--viewport-padding, 32px))) scale(0.95);
          }
        }
        
        @keyframes KSwipeOut {
          from {
            opacity: 1;
            transform: translateY(var(--radix-toast-swipe-end-y)) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(calc(100% + var(--viewport-padding, 32px))) scale(0.9);
          }
        }
        
        .toast-root-animatable {
          transition: transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .toast-root-animatable[data-state='open'] {
          animation: KSlideIn 300ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        }
        
        .toast-root-animatable[data-state='closed'] {
          animation: KHide 250ms cubic-bezier(0.26, 0.09, 0.58, 1) forwards;
        }
        
        .toast-root-animatable[data-swipe='move'] {
          transform: translateY(var(--radix-toast-swipe-move-y));
          opacity: 1;
          transition: none;
        }
        
        .toast-root-animatable[data-swipe='cancel'] {
          transform: translateY(0);
          transition: transform 250ms cubic-bezier(0.21, 1.02, 0.73, 1);
          opacity: 1;
        }
        
        .toast-root-animatable[data-swipe='end'] {
          animation: KSwipeOut 250ms cubic-bezier(0.26, 0.09, 0.58, 1) forwards;
        }
        `}
      </style>
    </Toast.Root>
  );
};

export default ToastComponent;