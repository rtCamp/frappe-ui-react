import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import { BAR_HEIGHT, CELL_HEIGHT } from "../constants";

const ganttBarVariants = cva(
  "absolute flex items-center gap-1.5 rounded-[9px] px-2.5 py-2 overflow-hidden whitespace-nowrap",
  {
    variants: {
      variant: {
        full: "bg-surface-green-2 text-ink-green-4",
        under: "bg-surface-amber-2 text-ink-amber-4",
        over: "bg-surface-violet-1 text-ink-violet-1",
        project:
          "bg-surface-white text-ink-gray-5 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.14)]",
      },
    },
  }
);

interface GanttBarProps extends VariantProps<typeof ganttBarVariants> {
  label: string;
  left: number;
  width: number;
  className?: string;
}

export function GanttBar({
  variant,
  label,
  left,
  width,
  className,
}: GanttBarProps) {
  return (
    <div
      className={cn(ganttBarVariants({ variant }), className)}
      style={{
        left,
        width,
        height: BAR_HEIGHT,
        top: (CELL_HEIGHT - BAR_HEIGHT) / 2,
      }}
    >
      <span className="text-[13px] font-medium tracking-[0.02em] truncate">
        {label}
      </span>
    </div>
  );
}

GanttBar.displayName = "GanttBar";
