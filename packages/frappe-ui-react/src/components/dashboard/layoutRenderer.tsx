import { LayoutBox } from "./layoutBox";
import { Widget } from "./widget";
import type { LayoutRendererProps } from "./types";

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({
  layout,
  activeParentId,
}) => {
  if (layout.type === "row") {
    return (
      <LayoutBox
        layout={layout}
        orientation="horizontal"
        activeParentId={activeParentId}
      />
    );
  } else if (layout.type === "stack") {
    return (
      <LayoutBox
        layout={layout}
        orientation="vertical"
        activeParentId={activeParentId}
      />
    );
  } else if (layout.type === "component") {
    return <Widget layout={layout} />;
  }
  return null;
};
