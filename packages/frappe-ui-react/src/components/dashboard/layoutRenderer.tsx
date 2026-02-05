import { LayoutBox } from "./layoutBox";
import { Widget } from "./widget";
import type { LayoutRendererProps } from "./types";

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({ layout, parentLocked = false }) => {
  if (layout.type === "component") {
    return <Widget layout={layout} parentLocked={parentLocked} />;
  } else if (layout.type !== "empty") {
    return (
      <LayoutBox
        layout={layout}
        orientation={layout.type === "row" ? "horizontal" : "vertical"}
        parentLocked={parentLocked}
      />
    );
  }
  return null;
};
