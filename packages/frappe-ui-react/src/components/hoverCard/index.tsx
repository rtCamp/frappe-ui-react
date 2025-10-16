/*
 * External dependencies.
 */
import { Root, Trigger, Content, type HoverCardContentProps } from "@radix-ui/react-hover-card";

/**
 * Internal dependencies.
 */
import { mergeClassNames } from "../../utils/mergeClassnames";

const HoverCard = Root;

const HoverCardTrigger = Trigger;

const HoverCardContent = ({ className = "", align = "center", sideOffset = 4, ...props }: HoverCardContentProps, ref: React.Ref<HTMLDivElement>) => (
  <Content
    ref={ref}
    align={align as HoverCardContentProps["align"]}
    sideOffset={sideOffset}
    className={mergeClassNames(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
);

export { HoverCard, HoverCardTrigger, HoverCardContent };