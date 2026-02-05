import { LayoutBox } from "./layoutBox";
import { Widget } from "./widget";
import type { LayoutRendererProps } from "./types";

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({
  layout,
  activeParentId,
  activeSlotId,
}) => {
  if (layout.type === "component") {
    return <Widget layout={layout} />;
  } else if (layout.type !== "empty") {
    return (
      <LayoutBox
        layout={layout}
        orientation={layout.type === "row" ? "horizontal" : "vertical"}
        activeParentId={activeParentId}
        activeSlotId={activeSlotId}
      />
    );
  }
  return null;
};
