import React, { useMemo } from "react";
import { Root, Portal, Overlay, Content, Close, Description, Title} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";
import { Button } from "../button";
import FeatherIcon from "../featherIcon";
import { DialogActionButton, type DialogAction } from "./dialogActionButton";
import "./dialog.css";

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

export const Dialog = ({
  open,
  onOpenChange,
  options = {},
  disableOutsideClickToClose = false,
  onAfterLeave,
  children,
  actions: customActions,
}: DialogProps) => {
  const {
    title,
    message,
    size,
    position = "center",
    icon: iconProp,
    actions = [],
  } = options;

  const handleInteractOutside = (e: Event) => {
    if (disableOutsideClickToClose) {
      e.preventDefault();
    }
  };

  const closeDialog = () => onOpenChange(false);

  const icon = useMemo(() => {
    if (!iconProp) return null;
    return typeof iconProp === "string" ? { name: iconProp } : iconProp;
  }, [iconProp]);

  const dialogPositionClasses = useMemo(
    () => ({
      "justify-center": position === "center",
      "pt-[20vh]": position === "top",
    }),
    [position]
  );

  const dialogIconBgClasses = useMemo(() => {
    if (!icon?.appearance) {
      return "bg-surface-gray-2";
    }

    if (icon.appearance === "warning") {
      return "bg-surface-amber-2";
    }

    if (icon.appearance === "info") {
      return "bg-surface-gray-2";
    }

    if (icon.appearance === "danger") {
      return "bg-surface-red-2";
    }

    if (icon.appearance === "success") {
      return "bg-surface-green-2";
    }
  }, [icon]);

  const dialogIconClasses = useMemo(() => {
    if (!icon?.appearance) {
      return "text-ink-gray-5";
    }

    if (icon.appearance === "warning") {
      return "text-ink-amber-3";
    }

    if (icon.appearance === "info") {
      return "text-ink-blue-3";
    }

    if (icon.appearance === "danger") {
      return "text-ink-red-4";
    }

    if (icon.appearance === "success") {
      return "text-ink-green-3";
    }
  }, [icon]);

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Overlay
          className="dialog-overlay fixed inset-0 bg-black-overlay-200 backdrop-filter backdrop-blur-[12px] overflow-y-auto"
          data-dialog={'dialog'}
          onAnimationEnd={() => !open && onAfterLeave?.()}
        >
          <div
            className={clsx(
              "flex min-h-screen flex-col items-center px-4 py-4 text-center",
              dialogPositionClasses
            )}
          >
            <Content
              className={clsx(
                "dialog-content my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-left align-middle shadow-xl",
                {
                  "max-w-7xl": size === "7xl",
                  "max-w-6xl": size === "6xl",
                  "max-w-5xl": size === "5xl",
                  "max-w-4xl": size === "4xl",
                  "max-w-3xl": size === "3xl",
                  "max-w-2xl": size === "2xl",
                  "max-w-xl": size === "xl",
                  "max-w-lg": size === "lg" || !size,
                  "max-w-md": size === "md",
                  "max-w-sm": size === "sm",
                  "max-w-xs": size === "xs",
                }
              )}
              onEscapeKeyDown={closeDialog}
              onInteractOutside={handleInteractOutside}
            >
              <div className="bg-surface-modal px-4 pb-6 pt-5 sm:px-6">
                <div className="flex">
                  <div className="w-full flex-1">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {icon && (
                          <div
                            className={clsx(
                              "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                              dialogIconBgClasses
                            )}
                          >
                            <FeatherIcon
                              name={icon.name}
                              className={clsx("h-4 w-4", dialogIconClasses)}
                              aria-hidden="true"
                            />
                          </div>
                        )}
                        <Title asChild>
                          {typeof title === "string" ? (
                            <h3 className="text-2xl font-semibold leading-6 text-ink-gray-9">
                            { title || "Untitled"}
                          </h3>
                          ): title && title()}
                        </Title>
                      </div>
                      <Close asChild>
                        <Button variant="ghost" onClick={closeDialog}>
                          <X className="h-4 w-4 text-ink-gray-9" />
                        </Button>
                      </Close>
                    </div>

                    {children
                      ? children
                      : message && (
                          <Description asChild>
                            <p className="text-p-base text-ink-gray-7">
                              {message}
                            </p>
                          </Description>
                        )}
                  </div>
                </div>
              </div>

              {(actions.length > 0 || customActions) && (
                <div className="px-4 pb-7 pt-4 sm:px-6">
                  {customActions ? (
                    customActions
                  ) : (
                    <div className="space-y-2">
                      {actions.map((action) => (
                        <DialogActionButton
                          key={action.label}
                          action={action}
                          close={closeDialog}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Content>
          </div>
        </Overlay>
      </Portal>
    </Root>
  );
};
