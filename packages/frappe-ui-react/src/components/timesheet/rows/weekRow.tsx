/**
 * External dependencies.
 */
import {
  ChevronDown,
  Send,
  CircleCheck,
  CircleX,
  Hourglass,
} from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import { Badge, type BadgeProps } from "../../badge";
import { Button, type ButtonVariant } from "../../button";
import { cn } from "../../../utils";

type WeekRowStatus =
  | "Not Submitted"
  | "Approved"
  | "Rejected"
  | "Approval Pending"
  | "None";

export interface WeekRowProps {
  label?: string;
  nesting?: number;
  collapsed?: boolean;
  status?: WeekRowStatus;
  thisWeek?: boolean;
  onToggle?: () => void;
  onButtonClick?: () => void;
  dates: string[];
  today?: string;
  totalHours?: string;
}

const statusTheme: Record<WeekRowStatus, BadgeProps["theme"]> = {
  "Not Submitted": "gray",
  Approved: "green",
  Rejected: "red",
  "Approval Pending": "orange",
  None: "gray",
};

const statusIcon: Record<
  WeekRowStatus,
  { variant: ButtonVariant; icon: React.ReactNode }
> = {
  "Not Submitted": {
    variant: "solid",
    icon: <Send size={16} />,
  },
  Approved: {
    variant: "ghost",
    icon: <CircleCheck size={16} />,
  },
  Rejected: {
    variant: "ghost",
    icon: <CircleX size={16} />,
  },
  "Approval Pending": {
    variant: "ghost",
    icon: <Hourglass size={16} />,
  },
  None: {
    variant: "ghost",
    icon: null,
  },
};

const totalHoursVariants = cva("", {
  variants: {
    status: {
      "Not Submitted": "",
      Approved: "",
      Rejected: "",
      "Approval Pending": "",
      None: "",
    },
    collapsed: { true: "", false: "" },
    thisWeek: { true: "", false: "" },
  },
  compoundVariants: [
    {
      collapsed: true,
      status: "Not Submitted",
      class: "text-ink-green-4",
    },
    {
      collapsed: true,
      status: "Approved",
      class: "text-ink-green-4",
    },
    { collapsed: true, status: "Rejected", class: "text-ink-red-4" },
    {
      collapsed: true,
      status: "Approval Pending",
      class: "text-ink-amber-4",
    },
    { collapsed: true, status: "None", class: "text-ink-gray-6" },
    {
      collapsed: true,
      status: "Approval Pending",
      thisWeek: false,
      class: "text-ink-red-4",
    },
  ],
  defaultVariants: { collapsed: false, thisWeek: true },
});

const buttonVariants = cva("", {
  variants: {
    status: {
      "Not Submitted": "text-ink-white",
      Approved: "text-ink-green-4",
      Rejected: "text-ink-red-4",
      "Approval Pending": "text-ink-amber-4",
      None: "",
    },
    thisWeek: { true: "", false: "" },
    collapsed: { true: "", false: "" },
  },
  compoundVariants: [
    {
      status: "Rejected",
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

export const WeekRow: React.FC<WeekRowProps> = ({
  label = "This Week",
  nesting = 0,
  collapsed = false,
  status = "Not Submitted",
  thisWeek = false,
  dates,
  today = "",
  onToggle,
  onButtonClick,
  totalHours = "",
}) => {
  const isStatusNone = status === "None";

  return (
    <div
      className="flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between py-2"
      style={{ paddingLeft: `${nesting * 16}px` }}
    >
      <div className="shrink-0 align-middle flex flex-1 items-center gap-2">
        <Button
          onClick={onToggle}
          disabled={!onToggle}
          variant="ghost"
          className={cn(
            "border-none outline-none focus:ring-0 focus-visible:ring-0 transition-transform bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
            collapsed ? "-rotate-90" : "rotate-0"
          )}
          icon={() => <ChevronDown strokeWidth={1.5} size={18} />}
          aria-label="Toggle week"
        />
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        {status && status !== "None" && (
          <Badge theme={statusTheme[status]}>{status}</Badge>
        )}
      </div>
      {!collapsed &&
        dates.map((date) => {
          const monthAndDay = date.split(" ");
          const isToday = thisWeek && date === today;
          return (
            <div
              key={date}
              className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5"
            >
              <span>
                {monthAndDay[0]}{" "}
                <span
                  className={cn(
                    isToday &&
                      "w-4.25 h-4.25 px-1 py-px rounded-sm bg-surface-red-5 text-ink-white"
                  )}
                >
                  {monthAndDay[1]}
                </span>
              </span>
            </div>
          );
        })}

      {!(isStatusNone && collapsed) && (
        <div className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5">
          <span className={totalHoursVariants({ status, collapsed, thisWeek })}>
            {collapsed ? totalHours : "Total"}
          </span>
        </div>
      )}

      <div className="shrink-0 align-middle w-12 flex justify-end items-center whitespace-nowrap">
        <Button
          onClick={onButtonClick}
          className={cn(
            buttonVariants({ status, thisWeek, collapsed }),
            statusIcon[status]?.variant === "ghost" &&
              "border-none outline-none focus:ring-0 focus-visible:ring-0 bg-transparent hover:bg-transparent active:bg-transparent",
            isStatusNone && "cursor-default!"
          )}
          variant={statusIcon[status]?.variant}
          size="sm"
          icon={() => statusIcon[status]?.icon}
          disabled={isStatusNone}
          aria-label="Submit week"
          title={status}
        />
      </div>
    </div>
  );
};
