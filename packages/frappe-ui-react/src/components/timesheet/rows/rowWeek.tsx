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

/**
 * Internal dependencies.
 */
import { Badge, type BadgeProps } from "../../badge";
import { Button, type ButtonVariant } from "../../button";
import { cn } from "../../../utils";

type RowWeekStatus =
  | "Not Submitted"
  | "Approved"
  | "Rejected"
  | "Approval Pending";

export interface RowWeekProps {
  label?: string;
  nesting?: number;
  collapsed?: boolean;
  status?: RowWeekStatus;
  thisWeek?: boolean;
  onToggle?: () => void;
  dates: string[];
  today?: string;
  totalHours?: string;
}

const statusTheme: Record<RowWeekStatus, BadgeProps["theme"]> = {
  "Not Submitted": "gray",
  Approved: "green",
  Rejected: "red",
  "Approval Pending": "orange",
};

const statusLabel: Record<RowWeekStatus, string> = {
  "Not Submitted": "Not Submitted",
  Approved: "Approved",
  Rejected: "Rejected",
  "Approval Pending": "Approval Pending",
};

const StatusIcon: Record<
  RowWeekStatus,
  { variant: ButtonVariant; icon: React.ReactNode }
> = {
  "Not Submitted": {
    variant: "solid",
    icon: <Send size={16} />,
  },
  Approved: {
    variant: "ghost",
    icon: <CircleCheck size={18} className="text-(--color-ink-green-4)" />,
  },
  Rejected: {
    variant: "ghost",
    icon: <CircleX size={18} className="text-ink-red-4" />,
  },
  "Approval Pending": {
    variant: "ghost",
    icon: <Hourglass size={18} className="text-(--color-ink-amber-4)" />,
  },
};

export const RowWeek: React.FC<RowWeekProps> = ({
  label = "This Week",
  nesting = 0,
  collapsed = false,
  status = "Not Submitted",
  dates,
  today = "",
  onToggle,
  totalHours = "",
}) => {
  return (
    <div
      className="flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-3 py-3.5"
      style={{ paddingLeft: `${nesting * 16}px` }}
    >
      <div className="shrink-0 align-middle flex flex-1 items-center gap-2">
        <Button
          onClick={onToggle}
          disabled={!onToggle}
          variant="ghost"
          className={cn(
            "transition-transform bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
            collapsed ? "-rotate-90" : "rotate-0"
          )}
          icon={() => <ChevronDown strokeWidth={1.5} size={18} />}
          aria-label="Toggle week"
        />
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        {status && (
          <Badge theme={statusTheme[status]}>{statusLabel[status]}</Badge>
        )}
      </div>
      {!collapsed &&
        dates.map((date) => {
          const monthAndDay = date.split(" ");
          const isToday = date === today;
          return (
            <div
              key={date}
              className="shrink-0 align-middle w-16 text-sm text-center text-ink-gray-5 whitespace-nowrap p-0"
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

      <div className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5">
        <span
          className={cn(
            "whitespace-nowrap",
            collapsed &&
              {
                "Not Submitted": "text-ink-gray-6",
                Approved: "text-(--color-ink-green-4)",
                Rejected: "text-ink-red-4",
                "Approval Pending": "text-(--color-ink-amber-4)",
              }[status]
          )}
        >
          {collapsed ? totalHours : "Total"}
        </span>
      </div>

      <div className="shrink-0 align-middle w-12 flex justify-end items-center whitespace-nowrap p-0">
        <Button
          className="border-none outline-none focus:ring-0 focus-visible:ring-0"
          variant={StatusIcon[status].variant}
          size="sm"
          icon={() => StatusIcon[status].icon}
          aria-label="Submit week"
        />
      </div>
    </div>
  );
};
