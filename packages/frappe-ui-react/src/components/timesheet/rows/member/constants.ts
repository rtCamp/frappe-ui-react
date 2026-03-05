/**
 * External dependencies.
 */
import React from "react";
import { CircleCheck, CircleX } from "lucide-react";
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
    variant: "ghost",
    icon: null,
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
    variant: "solid",
    icon: CircleCheck,
  },
  none: {
    variant: "ghost",
    icon: null,
  },
};

export const totalHoursVariants = cva("text-base font-medium", {
  variants: {
    status: {
      "not-submitted": "",
      approved: "text-ink-green-4",
      rejected: "text-ink-red-4",
      "approval-pending": "text-ink-amber-4",
      none: "text-ink-green-4",
    },
  },
});

export const buttonVariants = cva("", {
  variants: {
    status: {
      "not-submitted": "",
      approved: "text-ink-green-4",
      rejected: "text-ink-red-4",
      "approval-pending": "text-ink-white",
      none: "",
    },
    variant: {
      solid: "",
      subtle: "",
      outline: "",
      ghost:
        "border-none outline-none focus:ring-0 focus-visible:ring-0 bg-transparent hover:bg-transparent active:bg-transparent",
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});
