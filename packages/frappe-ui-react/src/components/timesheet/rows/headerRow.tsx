/**
 * Internal dependencies.
 */
import { Breadcrumbs, type BreadcrumbsProps } from "../../breadcrumbs";
import { cn } from "../../../utils";

export interface HeaderRowProps {
  /** Props configuration for the Breadcrumbs component displayed in the header row. */
  breadcrumbs: BreadcrumbsProps;
  /** Nesting level for the week row, used for indentation. */
  nesting?: number;
  /** Array of time entries for each day of the week. */
  days: string[];
  /** Additional class names for the header row container. */
  className?: string;
}

const NESTING_OFFSET = 10;
const BASE_PADDING = 4;

export const HeaderRow: React.FC<HeaderRowProps> = ({
  breadcrumbs,
  nesting = 0,
  days,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 h-7",
        className
      )}
      style={{ paddingLeft: `${BASE_PADDING + nesting * NESTING_OFFSET}px` }}
      data-testid="header-row"
    >
      <div className="shrink-0 align-middle flex flex-1 items-center">
        <Breadcrumbs compactCrumbs={false} {...breadcrumbs} />
      </div>
      {days.map((day, index) => (
        <div
          key={`${day}-${index}`}
          className="shrink-0 flex justify-end w-16 text-sm text-ink-gray-6 whitespace-nowrap px-2 py-1.5"
        >
          <span>{day}</span>
        </div>
      ))}

      <div className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5">
        <span>Total</span>
      </div>

      <div className="shrink-0 align-middle w-12"></div>
    </div>
  );
};
