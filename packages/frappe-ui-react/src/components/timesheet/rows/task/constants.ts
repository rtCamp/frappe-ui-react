/**
 * External dependencies.
 */
import { cva } from "class-variance-authority";
import {
  Circle,
  CircleCheckBig,
  CircleX,
  ClipboardClock,
  Clock12,
  Loader,
} from "lucide-react";

export type MemberStatus =
  | "open"
  | "working"
  | "pending-rev"
  | "overdue"
  | "completed"
  | "cancelled";

export const statusIcon: Record<
  MemberStatus,
  React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>
> = {
  open: Circle,
  working: Loader,
  "pending-rev": ClipboardClock,
  overdue: Clock12,
  completed: CircleCheckBig,
  cancelled: CircleX,
};

export const statusIconVariants = cva("", {
  variants: {
    status: {
      open: "text-ink-gray-3",
      working: "text-ink-gray-9",
      "pending-rev": "text-ink-gray-9",
      overdue: "text-ink-red-4",
      completed: "text-ink-gray-9",
      cancelled: "text-ink-gray-9",
    },
  },
});
