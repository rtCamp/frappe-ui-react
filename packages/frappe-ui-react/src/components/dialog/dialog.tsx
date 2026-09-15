/**
 * External dependencies.
 */
import { useMemo } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";
import { Button } from "../button";
import FeatherIcon, { type FeatherIconProps } from "../featherIcon";
import { DialogActionButton } from "./dialogActionButton";
import { Close } from "../../icons";
import "./dialog.css";
import type { DialogProps } from "./types";

const iconWrapperVariants = cva(
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      appearance: {
        default: "bg-surface-gray-2",
        info: "bg-surface-gray-2",
        warning: "bg-surface-amber-2",
        danger: "bg-surface-red-2",
        success: "bg-surface-green-2",
      },
    },
    defaultVariants: { appearance: "default" },
  }
);

const iconVariants = cva("size-4", {
  variants: {
    appearance: {
      default: "text-ink-gray-5",
      info: "text-ink-blue-3",
      warning: "text-ink-amber-3",
      danger: "text-ink-red-4",
      success: "text-ink-green-3",
    },
  },
  defaultVariants: { appearance: "default" },
});

const Dialog = ({
  open,
  onOpenChange,
  options = {},
  disableOutsideClickToClose = false,
  onAfterLeave,
  children,
  actions: customActions,
  className,
  classNames = {},
}: DialogProps) => {
  const {
    title,
    message,
    size,
    position = "center",
    icon: iconProp,
    actions = [],
  } = options;

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

  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={onOpenChange}
      disablePointerDismissal={disableOutsideClickToClose}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={cn(
            "dialog-backdrop fixed inset-0 bg-black-overlay-200 backdrop-filter backdrop-blur-md overflow-y-auto z-11",
            classNames.backdrop
          )}
          data-dialog="dialog"
          onAnimationEnd={() => !open && onAfterLeave?.()}
        >
          <BaseDialog.Viewport
            className={cn(
              "flex min-h-screen flex-col items-center px-4 py-4 text-center",
              dialogPositionClasses,
              classNames.viewport
            )}
          >
            <BaseDialog.Popup
              className={cn(
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
                },
                className
              )}
            >
              <div
                className={cn(
                  "bg-surface-modal px-4 pb-6 pt-5 sm:px-6",
                  classNames.content
                )}
              >
                <div className="flex">
                  <div className="w-full flex-1">
                    <div
                      className={cn(
                        "mb-6 flex items-center justify-between",
                        classNames.header
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-2",
                          classNames.titleWrapper
                        )}
                      >
                        {icon && (
                          <div
                            className={cn(
                              iconWrapperVariants({
                                appearance: icon.appearance ?? "default",
                              }),
                              classNames.iconWrapper
                            )}
                          >
                            <FeatherIcon
                              name={icon.name as FeatherIconProps["name"]}
                              className={cn(
                                iconVariants({
                                  appearance: icon.appearance ?? "default",
                                }),
                                classNames.icon
                              )}
                              aria-hidden="true"
                            />
                          </div>
                        )}
                        <BaseDialog.Title
                          render={
                            typeof title === "string" || !title ? (
                              <h3
                                className={cn(
                                  "text-2xl font-semibold leading-6 text-ink-gray-9",
                                  classNames.title
                                )}
                                data-testid="dialog-title"
                              >
                                {title || "Untitled"}
                              </h3>
                            ) : (
                              title()
                            )
                          }
                        />
                      </div>
                      <BaseDialog.Close
                        render={
                          <Button
                            variant="ghost"
                            onClick={closeDialog}
                            className={classNames.closeButton}
                            data-testid="dialog-close"
                          >
                            <Close
                              className={cn(
                                "size-4 text-ink-gray-9",
                                classNames.closeIcon
                              )}
                            />
                          </Button>
                        }
                        nativeButton={true}
                      />
                    </div>

                    {children
                      ? children
                      : message && (
                          <BaseDialog.Description
                            render={
                              <p
                                className={cn(
                                  "text-p-base text-ink-gray-7",
                                  classNames.description
                                )}
                                data-testid="dialog-description"
                              >
                                {message}
                              </p>
                            }
                          />
                        )}
                  </div>
                </div>
              </div>

              {(actions.length > 0 || customActions) && (
                <div
                  className={cn("px-4 pb-7 pt-4 sm:px-6", classNames.footer)}
                >
                  {customActions ? (
                    customActions
                  ) : (
                    <div className={cn("space-y-2", classNames.actions)}>
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
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Backdrop>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};

export default Dialog;
