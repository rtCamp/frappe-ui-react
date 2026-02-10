import { ChevronDown, ChevronRight, Send, Check, X, Clock } from "lucide-react";
import { Badge, type BadgeProps } from "../../badge";

type RowWeekStatus =
  | "not-submitted"
  | "approved"
  | "rejected"
  | "approval-pending";

export interface RowWeekProps {
  nesting?: number;
  collapsed?: boolean;
  status?: RowWeekStatus;
  thisWeek?: boolean;
  onToggle?: () => void;
  dates: string[];
}

const statusTheme: Record<RowWeekStatus, BadgeProps["theme"]> = {
  "not-submitted": "gray",
  approved: "green",
  rejected: "red",
  "approval-pending": "orange",
};

const statusLabel: Record<RowWeekStatus, string> = {
  "not-submitted": "Not Submitted",
  approved: "Approved",
  rejected: "Rejected",
  "approval-pending": "Approval Pending",
};

export const RowWeek: React.FC<RowWeekProps> = ({
  nesting = 0,
  collapsed = false,
  status,
  thisWeek = false,
  dates,
  onToggle,
}) => {
  return (
    <div
      className="w-full border-b border-gray-200 bg-white"
      style={{ paddingLeft: `${nesting * 16}px` }}
    >
      <div className="flex items-center justify-between gap-4 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={onToggle}
            disabled={!onToggle}
            className="flex h-6 w-6 items-center justify-center rounded text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Toggle week"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
          </button>
          <span className="text-sm font-semibold text-gray-900">This Week</span>
          {status && (
            <Badge theme={statusTheme[status]}>{statusLabel[status]}</Badge>
          )}
        </div>
        <div className="ml-auto flex items-center gap-6 text-sm text-gray-500">
          {dates.map((date) => (
            <span key={date} className="whitespace-nowrap">
              {date}
            </span>
          ))}

          <span className="whitespace-nowrap">Total</span>

          {status === "not-submitted" && thisWeek && (
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white shadow-sm transition-colors hover:bg-gray-800"
              aria-label="Submit week"
            >
              <Send size={16} />
            </button>
          )}

          {status === "approved" && thisWeek && (
            <Check size={18} className="text-green-600" />
          )}
          {status === "rejected" && thisWeek && (
            <X size={18} className="text-red-600" />
          )}
          {status === "approval-pending" && thisWeek && (
            <Clock size={18} className="text-orange-600" />
          )}
        </div>
      </div>
    </div>
  );
};
