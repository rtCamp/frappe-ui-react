import React, { useMemo } from "react";
import { TooltipProps } from "./types";
import {
  TooltipProvider,
  Root,
  TooltipPortal,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from "@radix-ui/react-tooltip";

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
    <TooltipProvider delayDuration={delayDuration}>
      <Root>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          {tooltipContent && (
            <TooltipContent
              side={placement}
              sideOffset={4}
              className="z-[100] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade select-none rounded-lg shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            >
              {tooltipContent}
              <TooltipArrow className={arrowClass} width={8} height={4} />
            </TooltipContent>
          )}
        </TooltipPortal>
      </Root>
    </TooltipProvider>
  );
};

export default TooltipComponent;
