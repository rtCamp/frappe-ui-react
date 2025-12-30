import { SpacerProps } from "./types";

const Spacer = ({ orientation = "horizontal", size = 16 }: SpacerProps) => {
  return (
    <div
      className={orientation === "horizontal" ? "w-full" : "h-full"}
      style={
        orientation === "horizontal"
          ? { height: size, minHeight: size }
          : { width: size, minWidth: size }
      }
    />
  );
};

export default Spacer;
