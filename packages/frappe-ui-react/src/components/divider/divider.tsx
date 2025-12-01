import { useMemo } from "react";
import clsx from "clsx";

import { Button } from "../button";
import { DividerProps } from "./types";

const Divider = ({
  orientation = "horizontal",
  position = "center",
  flexItem = false,
  action,
}: DividerProps) => {
  const alignmentClasses = useMemo(() => {
    const spacerDimensionClasses = {
      horizontal: "border-t w-full",
      vertical: "border-l",
    }[orientation];

    const flexClasses = flexItem ? "self-stretch h-auto" : "h-full";

    return [spacerDimensionClasses, flexClasses];
  }, [orientation, flexItem]);

  const actionAlignmentClasses = useMemo(() => {
    return {
      horizontal: {
        center: "left-1/2 top-0 -translate-y-1/2 -translate-x-1/2",
        start: "left-0 top-0 -translate-y-1/2 ml-4",
        end: "right-0 top-0 -translate-y-1/2 mr-4",
      },
      vertical: {
        center: "-translate-x-1/2 top-1/2 left-0 -translate-y-1/2",
        start: "-translate-x-1/2 top-0 mt-4 left-0",
        end: "-translate-x-1/2 bottom-0 mb-4 left-0",
      },
    }[orientation][position];
  }, [orientation, position]);

  return action ? (
    <div
      className={clsx(
        "relative whitespace-nowrap border-0 border-outline-gray-2",
        alignmentClasses
      )}
    >
      <span className={clsx("absolute", actionAlignmentClasses)}>
        <Button
          label={action.label}
          loading={action.loading}
          size="sm"
          variant="outline"
          onClick={action.handler}
        />
      </span>
    </div>
  ) : (
    <hr
      className={clsx(
        "relative whitespace-nowrap border-0 border-outline-gray-2",
        alignmentClasses
      )}
    />
  );
};

export default Divider;
