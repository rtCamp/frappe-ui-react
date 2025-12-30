/**
 * External dependencies.
 */
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { DividerProps } from "./types";

const Divider = ({
  orientation = "horizontal",
  slot,
  position = "center",
  padding = 0,
  flexItem = false,
}: DividerProps) => {
  const alignmentClasses =
    orientation === "horizontal" ? "border-t w-full" : "border-l h-full";

  const flexClasses = flexItem ? "self-stretch h-auto" : "h-full";

  const positionClasses =
    orientation === "horizontal"
      ? {
          start: "w-full justify-start items-center pl-4",
          center: "w-full justify-center items-center",
          end: "w-full justify-end items-center pr-4",
        }[position]
      : {
          start: "h-full justify-center items-start pt-4",
          center: "h-full justify-center items-center",
          end: "h-full justify-center items-end pb-4",
        }[position];
  return (
    <div
      className={clsx("relative flex justify-center items-center", flexClasses)}
      style={
        orientation === "horizontal"
          ? { paddingTop: padding, paddingBottom: padding }
          : { paddingLeft: padding, paddingRight: padding }
      }
    >
      <hr
        className={clsx(
          "absolute whitespace-nowrap border-0 border-outline-gray-1 z-0",
          alignmentClasses
        )}
      />
      {slot ? (
        <span className={clsx("flex z-1", positionClasses)}>{slot?.()}</span>
      ) : null}
    </div>
  );
};

export default Divider;
