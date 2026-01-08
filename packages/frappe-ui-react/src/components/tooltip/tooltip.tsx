import React, { useMemo } from "react";
import { TooltipProps } from "./types";
import { Tooltip } from "@base-ui/react/tooltip";
import clsx from "clsx";

const TooltipComponent: React.FC<TooltipProps> = ({
  children,
  body,
  text = "",
  placement = "top",
  hoverDelay = 0.5,
  arrowClass = "fill-surface-gray-7",
  disabled = false,
}) => {
  const delayDuration = useMemo(() => hoverDelay * 1000, [hoverDelay]);

  const tooltipContent = useMemo(() => {
    if (body) {
      return body;
    }

    if (text) {
      return (
        <div className="rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl">
          <div>{text}</div>
        </div>
      );
    }

    return null;
  }, [body, text]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip.Provider delay={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger render={children as React.ReactElement} />
        <Tooltip.Portal>
          {tooltipContent && (
            <Tooltip.Positioner side={placement} sideOffset={4}>
              <Tooltip.Popup className="z-[100] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade select-none rounded-lg shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
                {tooltipContent}
                <Tooltip.Arrow
                  className={clsx(
                    arrowClass,
                    "data-[side=bottom]:top-0 data-[side=bottom]:rotate-180 data-[side=bottom]:-translate-y-full",
                    "data-[side=left]:right-0 data-[side=left]:-rotate-90 data-[side=left]:translate-x-3/4",
                    "data-[side=right]:left-0 data-[side=right]:rotate-90 data-[side=right]:-translate-x-3/4"
                  )}
                >
                  <svg width={8} height={4} viewBox="0 0 8 4">
                    <polygon points="0,0 4,4 8,0" />
                  </svg>
                </Tooltip.Arrow>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          )}
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
