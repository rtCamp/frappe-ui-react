/**
 * External dependencies.
 */
import { ChevronDown, Folder } from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import { Button } from "../../button";
import { cn } from "../../../utils";

type ProjectRowStatus =
  | "Not Submitted"
  | "Approved"
  | "Rejected"
  | "Approval Pending"
  | "None";

export interface ProjectRowProps {
  label?: string;
  nesting?: number;
  collapsed?: boolean;
  onToggle?: () => void;
  timeEntries: string[];
  totalHours?: string;
  status?: ProjectRowStatus;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const totalHoursVariants = cva("", {
  variants: {
    status: {
      "Not Submitted": "text-ink-gray-6",
      Approved: "text-ink-green-4",
      Rejected: "text-ink-red-4",
      "Approval Pending": "text-ink-amber-4",
      None: "",
    },
  },
});

export const ProjectRow: React.FC<ProjectRowProps> = ({
  label = "This Week",
  nesting = 0,
  collapsed = false,
  onToggle,
  timeEntries,
  totalHours = "",
  status = "Not Submitted",
  prefixIcon,
  suffixIcon,
}) => {
  return (
    <div
      className="flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 py-2"
      style={{ paddingLeft: `${4 + nesting * 10}px` }}
    >
      <div className="shrink-0 align-middle flex flex-1 items-center">
        <Button
          onClick={onToggle}
          disabled={!onToggle}
          variant="ghost"
          className={cn(
            "border-none outline-none focus:ring-0 focus-visible:ring-0 transition-transform bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
            collapsed ? "-rotate-90" : "rotate-0"
          )}
          icon={() => <ChevronDown strokeWidth={1.5} size={16} />}
          aria-label="Toggle week"
        />
        <div className="flex items-center text-ink-gray-9 gap-2">
          {prefixIcon || <Folder strokeWidth={1.5} size={16} />}
          <span className="text-sm font-semibold">{label}</span>
          {suffixIcon ? suffixIcon : null}
        </div>
      </div>
      {timeEntries.map((timeEntry, index) => {
        return (
          <div
            key={index}
            className="shrink-0 flex justify-end w-16 text-sm text-ink-gray-6 whitespace-nowrap px-2 py-1.5"
          >
            {timeEntry === "" ? (
              <span className="w-10.25 text-center text-ink-gray-4">-</span>
            ) : (
              <span>{timeEntry}</span>
            )}
          </div>
        );
      })}

      <div className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5">
        <span className={totalHoursVariants({ status })}>{totalHours}</span>
      </div>

      <div className="shrink-0 align-middle w-12"></div>
    </div>
  );
};
