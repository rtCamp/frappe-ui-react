import React from 'react';
import { useAxisChartOptions } from './hooks';
import ChartWrapper from './charts';
import type { AxisChartConfig } from './types';

export interface AxisChartProps {
  config: AxisChartConfig;
}

const AxisChart: React.FC<AxisChartProps> = ({ config }) => {
  const { options, error } = useAxisChartOptions(config);

  return <ChartWrapper options={options} error={error ?? ''} />;
};

export default AxisChart;
