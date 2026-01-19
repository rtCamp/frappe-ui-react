// src/components/Popover/Popover.tsx
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { createPopper, type Instance, type Placement } from "@popperjs/core";

const popoverRootId = "frappeui-popper-root";

function getOrCreatePopoverRoot(): HTMLElement {
  let root = document.getElementById(popoverRootId);
  if (!root) {
    root = document.createElement("div");
    root.id = popoverRootId;
    root.style.position = "absolute";
    document.body.appendChild(root);
  }
  return root;
}

interface PopoverRenderProps {
  togglePopover: (flag?: boolean | React.MouseEvent) => void;
  updatePosition: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

interface PopoverTransitionClasses {
  enterActiveClass?: string;
  enterFromClass?: string;
  enterToClass?: string;
  leaveActiveClass?: string;
  leaveFromClass?: string;
  leaveToClass?: string;
}

export interface PopoverProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "onSelect"
> {
  show?: boolean;
  trigger?: "click" | "hover";
  hoverDelay?: number;
  leaveDelay?: number;
  placement?: Placement;
  popoverClass?: string | string[] | { [key: string]: boolean };
  transition?: string | PopoverTransitionClasses | null;
  hideOnBlur?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onUpdateShow?: (show: boolean) => void;
  target: (props: PopoverRenderProps) => ReactNode;
  body: (props: PopoverRenderProps) => ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  show: showProp,
  trigger = "click",
  hoverDelay = 0,
  leaveDelay = 0,
  placement = "bottom-start",
  popoverClass = "",
  transition = null,
  hideOnBlur = true,
  target,
  body,
  onOpen,
  onClose,
  onUpdateShow,
  ...rest
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [targetWidth, setTargetWidth] = useState<number | null>(null);
  const pointerOverTargetOrPopupRef = useRef<boolean>(false);

  const referenceRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null); // Store Popper instance
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const popperRoot = getOrCreatePopoverRoot();

  const showPropPassed: boolean = showProp !== undefined;
  const isOpen: boolean = showPropPassed ? showProp! : showPopup;

  const setIsOpen = useCallback(
    (val: boolean) => {
      if (showPropPassed) {
        if (onUpdateShow) {
          onUpdateShow(val);
        }
      } else {
        setShowPopup(val);
      }
      if (val === false) {
        if (onClose) {
          onClose();
        }
      } else if (val === true) {
        if (onOpen) {
          onOpen();
        }
      }
    },
    [showPropPassed, onUpdateShow, onClose, onOpen]
  );

  const updatePosition = useCallback(() => {
    popperInstance.current?.update();
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const togglePopover = useCallback(
    (flag?: boolean | React.MouseEvent) => {
      const newFlag = typeof flag === "boolean" ? flag : !isOpen;
      if (newFlag) {
        open();
      } else {
        close();
      }
    },
    [isOpen, open, close]
  );

  const onMouseover = useCallback(() => {
    pointerOverTargetOrPopupRef.current = true;
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (trigger === "hover") {
      if (hoverDelay) {
        hoverTimer.current = setTimeout(
          () => {
            if (pointerOverTargetOrPopupRef.current) {
              open();
            }
          },
          Number(hoverDelay) * 1000
        );
      } else {
        open();
      }
    }
  }, [trigger, hoverDelay, open]);

  const onMouseleave = useCallback(() => {
    pointerOverTargetOrPopupRef.current = false;
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }

    if (trigger === "hover") {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
      if (leaveDelay) {
        leaveTimer.current = setTimeout(
          () => {
            if (!pointerOverTargetOrPopupRef.current) {
              close();
            }
          },
          Number(leaveDelay) * 1000
        );
      } else {
        if (!pointerOverTargetOrPopupRef.current) {
          close();
        }
      }
    }
  }, [trigger, leaveDelay, close]);

  // Define a constant for the body container class (if used for sibling check)
  const popoverContainerClass = "body-container"; // This was used in Vue component's JS block

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      const reference = referenceRef.current;
      const popoverBody = popperRef.current;

      const insideClick =
        clickedElement === reference ||
        clickedElement === popoverBody ||
        reference?.contains(clickedElement) ||
        popoverBody?.contains(clickedElement);

      if (insideClick) {
        return;
      }

      const root = document.getElementById(popoverRootId);
      const insidePopoverRoot = root?.contains(clickedElement);
      if (!insidePopoverRoot) {
        close();
        return;
      }

      // Check if another popover (sibling) was clicked
      const clickedElementBody = clickedElement?.closest<HTMLElement>(
        `.${popoverContainerClass}`
      );
      const currentPopoverBody = reference?.closest<HTMLElement>(
        `.${popoverContainerClass}`
      );
      const isSiblingClicked =
        clickedElementBody &&
        currentPopoverBody &&
        clickedElementBody !== currentPopoverBody;

      if (isSiblingClicked) {
        close();
      }
    },
    [close, popoverContainerClass]
  );

  useEffect(() => {
    if (hideOnBlur) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, [hideOnBlur, handleClickOutside]);

  // Effect to manage Popper.js instance
  useEffect(() => {
    if (isOpen && referenceRef.current && popperRef.current) {
      popperInstance.current = createPopper(
        referenceRef.current,
        popperRef.current,
        {
          placement,
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                padding: 8,
              },
            },
            {
              name: "sameWidth",
              enabled: true,
              phase: "beforeWrite",
              requires: ["computeStyles"],
              fn: ({ state }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
              },
              effect: ({ state }) => {
                state.elements.popper.style.width = `${
                  state.elements.reference.getBoundingClientRect().width
                }px`;
              },
            },
          ],
        }
      );
      popperInstance.current.update();
    } else {
      popperInstance.current?.destroy();
      popperInstance.current = null;
    }

    return () => {
      // Cleanup on unmount or when isOpen becomes false
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
  }, [isOpen, placement]); // Re-run when isOpen or placement changes

  useEffect(() => {
    if (referenceRef.current) {
      setTargetWidth(referenceRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (showProp !== undefined && showProp !== isOpen) {
      setIsOpen(showProp);
    }
  }, [showProp, setIsOpen, isOpen]);

  const popupTransitionTemplates: Record<string, PopoverTransitionClasses> = {
    default: {
      enterActiveClass: "transition duration-150 ease-out",
      enterFromClass: "translate-y-1 opacity-0",
      enterToClass: "translate-y-0 opacity-100",
      leaveActiveClass: "transition duration-150 ease-in",
      leaveFromClass: "translate-y-0 opacity-100",
      leaveToClass: "translate-y-1 opacity-0",
    },
  };

  const getTransitionClasses = (type: "enter" | "leave"): string => {
    let classes: PopoverTransitionClasses = {};
    if (
      typeof transition === "string" &&
      popupTransitionTemplates[transition]
    ) {
      const template = popupTransitionTemplates[transition];
      classes = {
        enterActiveClass: template.enterActiveClass,
        enterFromClass: template.enterFromClass,
        enterToClass: template.enterToClass,
        leaveActiveClass: template.leaveActiveClass,
        leaveFromClass: template.leaveFromClass,
        leaveToClass: template.leaveToClass,
      };
    } else if (typeof transition === "object" && transition) {
      classes = transition;
    }

    const activeClass =
      type === "enter" ? classes.enterActiveClass : classes.leaveActiveClass;
    const fromClass =
      type === "enter" ? classes.enterFromClass : classes.leaveFromClass;
    const toClass =
      type === "enter" ? classes.enterToClass : classes.leaveToClass;

    return [activeClass, fromClass, toClass].filter(Boolean).join(" ");
  };

  const targetSlotContent = target({
    togglePopover,
    updatePosition,
    open,
    close,
    isOpen,
  });
  const bodySlotContent = body({
    togglePopover,
    updatePosition,
    open,
    close,
    isOpen,
  });

  return (
    <div ref={referenceRef} {...rest}>
      <div
        className="flex w-full"
        onClick={trigger === "click" ? togglePopover : undefined}
        onFocusCapture={updatePosition}
        onKeyDown={updatePosition}
        onMouseOver={trigger === "hover" ? onMouseover : undefined}
        onMouseLeave={trigger === "hover" ? onMouseleave : undefined}
      >
        {targetSlotContent}
      </div>

      {createPortal(
        <div
          style={{
            width: targetWidth || "auto",
            height: "auto",
            zIndex: 99,
            position: "absolute",
          }}
        >
          <div
            ref={popperRef}
            style={{
              ...((popperInstance.current?.state?.styles
                ?.popper as React.CSSProperties) ?? {}),
            }}
            data-popper-placement={
              popperInstance.current?.state?.placement || ""
            }
            className={`relative z-[100] ${popoverContainerClass} ${popoverClass} pointer-events-auto`}
            onMouseOver={trigger === "hover" ? onMouseover : undefined}
            onMouseLeave={trigger === "hover" ? onMouseleave : undefined}
          >
            {isOpen && (
              <div className={getTransitionClasses(isOpen ? "enter" : "leave")}>
                {bodySlotContent}
              </div>
            )}
          </div>
        </div>,
        popperRoot
      )}
    </div>
  );
};

export default Popover;
