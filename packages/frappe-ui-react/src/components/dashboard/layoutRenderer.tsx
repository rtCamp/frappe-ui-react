import { LayoutBox } from "./layoutBox";
import { Widget } from "./widget";
import type { LayoutRendererProps } from "./types";

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({ layout }) => {
  if (layout.type === "row") {
    return <LayoutBox layout={layout} orientation="horizontal" />;
  } else if (layout.type === "stack") {
    return <LayoutBox layout={layout} orientation="vertical" />;
  } else if (layout.type === "component") {
    return <Widget layout={layout} />;
  }
  return null;
};
