import React from "react";

import { useDonutChartOptions } from "./hooks";
import ChartWrapper from "./charts";
import type { DonutChartConfig } from "./types";

export interface DonutChartProps {
  config: DonutChartConfig;
}

const DonutChart: React.FC<DonutChartProps> = ({ config }) => {
  const options = useDonutChartOptions(config);

  return <ChartWrapper options={options} />;
};

export default DonutChart;
