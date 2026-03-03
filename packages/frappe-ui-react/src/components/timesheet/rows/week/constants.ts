/**
 * External dependencies.
 */
import React from "react";
import { Send, CircleCheck, CircleX, Hourglass } from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import type { BadgeProps } from "../../../badge";
import type { ButtonVariant } from "../../../button";
import type { RowStatus } from "../constants";

export const statusTheme: Record<RowStatus, BadgeProps["theme"]> = {
  "not-submitted": "gray",
  approved: "green",
  rejected: "red",
  "approval-pending": "orange",
  none: "gray",
};

export const statusIcon: Record<
  RowStatus,
  {
    variant: ButtonVariant;
    icon: React.ComponentType<{ size?: number }> | null;
  }
> = {
  "not-submitted": {
    variant: "solid",
    icon: Send,
  },
  approved: {
    variant: "ghost",
    icon: CircleCheck,
  },
  rejected: {
    variant: "ghost",
    icon: CircleX,
  },
  "approval-pending": {
    variant: "ghost",
    icon: Hourglass,
  },
  none: {
    variant: "ghost",
    icon: null,
  },
};

export const totalHoursVariants = cva("", {
  variants: {
    status: {
      "not-submitted": "text-ink-green-4",
      approved: "text-ink-green-4",
      rejected: "text-ink-red-4",
      "approval-pending": "text-ink-amber-4",
      none: "",
    },
    thisWeek: { true: "", false: "" },
  },
  compoundVariants: [
    {
      status: "approval-pending",
      thisWeek: false,
      class: "text-ink-red-4",
    },
  ],
  defaultVariants: { thisWeek: true },
});

export const buttonVariants = cva("", {
  variants: {
    status: {
      "not-submitted": "text-ink-white",
      approved: "text-ink-green-4",
      rejected: "text-ink-red-4",
      "approval-pending": "text-ink-amber-4",
      none: "",
    },
    thisWeek: { true: "", false: "" },
    collapsed: { true: "", false: "" },
    variant: {
      solid: "",
      subtle: "",
      outline: "",
      ghost:
        "border-none outline-none focus:ring-0 focus-visible:ring-0 bg-transparent hover:bg-transparent active:bg-transparent",
    },
  },
  compoundVariants: [
    {
      status: "rejected",
      thisWeek: false,
      collapsed: false,
      class: "text-ink-gray-5",
    },
  ],
  defaultVariants: {
    thisWeek: true,
    collapsed: false,
    variant: "solid",
  },
});
