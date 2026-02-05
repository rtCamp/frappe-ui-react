import { LayoutBox } from "./layoutBox";
import type { DashboardStackProps } from "./types";

export const DashboardStack: React.FC<DashboardStackProps> = ({ layout }) => {
  return <LayoutBox layout={layout} orientation="vertical" />;
}
