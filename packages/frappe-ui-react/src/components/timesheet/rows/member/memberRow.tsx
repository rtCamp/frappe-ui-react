/**
 * External dependencies.
 */
import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Badge } from "../../../badge";
import { Button } from "../../../button";
import { cn } from "../../../../utils";
import {
  buttonVariants,
  statusIcon,
  statusTheme,
  totalHoursVariants,
} from "./constants";
import { statusLabel, type RowStatus } from "../constants";
import { Avatar } from "../../../avatar";

export interface MemberRowProps {
  /** Name of the member. */
  label?: string;
  /** URL for the member's avatar image. */
  avatarUrl?: string;
  /** Whether the member row is collapsed or expanded. */
  collapsed?: boolean;
  /** Status of the timesheet for the member. */
  status?: RowStatus;
  /** Callback function when the member row is toggled between collapsed and expanded. */
  onToggle?: () => void;
  /** Callback function when the action button is clicked. */
  onButtonClick?: () => void;
  /** Array of time entries for each day of the week for the member. */
  timeEntries: string[];
  /** Total hours logged for the week. */
  totalHours?: string;
  /** Additional class names for the member row container. */
  className?: string;
}

export const MemberRow: React.FC<MemberRowProps> = ({
  label,
  avatarUrl,
  collapsed = false,
  status = "not-submitted",
  timeEntries,
  onToggle,
  onButtonClick,
  totalHours = "",
  className,
}) => {
  const isStatusNone = status === "none";

  return (
    <div
      className={cn(
        "flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 py-2",
        className
      )}
      data-testid="member-row"
    >
      <div className="min-w-0 align-middle flex flex-1 items-center gap-2">
        <Button
          onClick={onToggle}
          disabled={!onToggle}
          variant="ghost"
          className={cn(
            "w-4 shrink-0 border-none outline-none focus:ring-0 focus-visible:ring-0 transition-transform bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
            collapsed ? "-rotate-90" : "rotate-0"
          )}
          icon={() => <ChevronDown strokeWidth={1.5} size={16} />}
          aria-label="Toggle member"
        />
        <div className="min-w-0 flex items-center gap-2">
          <Avatar image={avatarUrl} shape="circle" label={label} size="xs" />
          <span className="text-base font-medium text-ink-gray-9 truncate leading-3.5">
            {label}
          </span>
          {status !== "none" && (
            <Badge theme={statusTheme[status]} className="shrink-0">
              {statusLabel[status]}
            </Badge>
          )}
        </div>
      </div>
      {timeEntries.map((timeEntry, index) => {
        return (
          <div
            key={index}
            className="shrink-0 flex justify-end items-center text-base text-ink-gray-9 whitespace-nowrap w-16 h-7 px-2 py-1.5 leading-3.5 lining-nums tabular-nums"
          >
            {timeEntry === "" ? (
              <span className="flex-1 ml-2 text-center text-ink-gray-4">-</span>
            ) : (
              <span
                className={cn(isStatusNone ? "text-ink-gray-6" : "font-medium")}
              >
                {timeEntry}
              </span>
            )}
          </div>
        );
      })}

      <div className="shrink-0 flex justify-end items-center text-sm text-end text-ink-gray-5 whitespace-nowrap w-16 h-7 px-2 py-1.5 leading-3.5">
        <span className={cn(totalHoursVariants({ status }))}>{totalHours}</span>
      </div>

      <div className="shrink-0 w-12 h-7 flex justify-end items-center whitespace-nowrap">
        {!isStatusNone && statusIcon[status]?.icon ? (
          <Button
            onClick={onButtonClick}
            className={cn(
              buttonVariants({
                status,
                variant: statusIcon[status]?.variant,
              })
            )}
            variant={statusIcon[status]?.variant}
            size="sm"
            icon={() => {
              const IconComponent = statusIcon[status]?.icon;
              return IconComponent ? <IconComponent size={16} /> : null;
            }}
            title={statusLabel[status]}
          />
        ) : null}
      </div>
    </div>
  );
};
