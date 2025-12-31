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
  className = "",
}: DividerProps) => {
  const isHorizontal = orientation === "horizontal";
  const flexClasses = flexItem ? "self-stretch h-auto" : "";

  if (!slot) {
    return (
      <hr
        className={clsx(
          "border-0 border-outline-gray-1",
          isHorizontal ? "border-t w-full" : "border-l h-full",
          flexClasses,
          className
        )}
        style={
          isHorizontal
            ? { marginTop: padding, marginBottom: padding }
            : { marginLeft: padding, marginRight: padding }
        }
      />
    );
  }

  return (
    <div
      className={clsx(
        "flex",
        isHorizontal ? "w-full items-center" : "h-full flex-col items-center",
        flexClasses,
        className
      )}
      style={
        isHorizontal
          ? { paddingTop: padding, paddingBottom: padding }
          : { paddingLeft: padding, paddingRight: padding }
      }
    >
      <hr
        className={clsx(
          "border-0 border-outline-gray-1",
          isHorizontal ? "border-t" : "border-l",
          position === "start" ? (isHorizontal ? "w-4" : "h-4") : "flex-1"
        )}
      />
      <span>{slot?.()}</span>
      <hr
        className={clsx(
          "border-0 border-outline-gray-1",
          isHorizontal ? "border-t" : "border-l",
          position === "end" ? (isHorizontal ? "w-4" : "h-4") : "flex-1"
        )}
      />
    </div>
  );
};

export default Divider;
