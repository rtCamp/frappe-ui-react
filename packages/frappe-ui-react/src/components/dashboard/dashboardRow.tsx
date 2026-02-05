import { LayoutBox } from "./layoutBox";
import type { DashboardRowProps } from "./types";

export const DashboardRow: React.FC<DashboardRowProps> = ({ layout }) => {
  return <LayoutBox layout={layout} orientation="horizontal" />;
}
