import React from 'react';
import { useFunnelChartOptions } from './hooks';
import ChartWrapper from './charts';
import type { DonutChartConfig } from './types';

interface FunnelChartProps {
  config: DonutChartConfig;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ config }) => {
  const options = useFunnelChartOptions(config);

  return <ChartWrapper options={options} />;
};

export default FunnelChart;