/**
 * External dependencies.
 */
import React from "react";
import { Send, CircleCheck, CircleX, Hourglass } from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import type { BadgeProps } from "../../badge";
import type { ButtonVariant } from "../../button";

export type WeekRowStatus =
  | "not-submitted"
  | "approved"
  | "rejected"
  | "approval-pending"
  | "none";

export const statusLabel: Record<WeekRowStatus, string> = {
  "not-submitted": "Not Submitted",
  approved: "Approved",
  rejected: "Rejected",
  "approval-pending": "Approval Pending",
  none: "None",
};

export const statusTheme: Record<WeekRowStatus, BadgeProps["theme"]> = {
  "not-submitted": "gray",
  approved: "green",
  rejected: "red",
  "approval-pending": "orange",
  none: "gray",
};

export const statusIcon: Record<
  WeekRowStatus,
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
      "not-submitted": "",
      approved: "",
      rejected: "",
      "approval-pending": "",
      none: "",
    },
    collapsed: { true: "", false: "" },
    thisWeek: { true: "", false: "" },
  },
  compoundVariants: [
    { collapsed: true, status: "not-submitted", class: "text-ink-green-4" },
    { collapsed: true, status: "approved", class: "text-ink-green-4" },
    { collapsed: true, status: "rejected", class: "text-ink-red-4" },
    { collapsed: true, status: "approval-pending", class: "text-ink-amber-4" },
    { collapsed: true, status: "none", class: "text-ink-gray-6" },
    {
      collapsed: true,
      status: "approval-pending",
      thisWeek: false,
      class: "text-ink-red-4",
    },
  ],
  defaultVariants: { collapsed: false, thisWeek: true },
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
  },
});

export const NESTING_OFFSET = 10;
export const BASE_PADDING = 4;
