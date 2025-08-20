import React from 'react';
import { formatValue } from './helpers';
import { NumberChartConfig } from './types';

interface RenderPropHelpers {
  formatValue: typeof formatValue;
}

interface NumberChartProps {
  config: NumberChartConfig;
  body?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: (helpers: RenderPropHelpers) => React.ReactNode;
  delta?: (helpers: RenderPropHelpers) => React.ReactNode;
}

const NumberChart: React.FC<NumberChartProps> = ({
  config,
  body,
  title,
  subtitle,
  delta,
}) => {
  const hasDelta = config.delta != null;
  const isDeltaPositive = hasDelta && config?.delta && config?.delta >= 0;

  const getDeltaColorClass = () => {
    if (config.negativeIsBetter) {
      return isDeltaPositive ? 'text-red-500' : 'text-green-500';
    }
    return isDeltaPositive ? 'text-green-500' : 'text-red-500';
  };

  const defaultContent = (
    <div className="flex w-full flex-col">
      {title || (
        <span className="truncate text-sm font-medium text-gray-500">
          {config.title}
        </span>
      )}

      {subtitle ? (
        subtitle({ formatValue })
      ) : (
        <div className="flex-1 flex-shrink-0 truncate text-[24px] font-semibold leading-10 text-gray-600">
          {config.prefix}
          {formatValue(config.value, 1, true)}
          {config.suffix}
        </div>
      )}

      {delta
        ? delta({ formatValue })
        : hasDelta && (
            <div
              className={`flex items-center gap-0.5 text-xs font-medium ${getDeltaColorClass()}`}
            >
              <span>{isDeltaPositive ? '↑' : '↓'}</span>
              <span>
                {config.deltaPrefix}
                {config.delta && formatValue(config.delta, 1, true)}
                {config.deltaSuffix}
              </span>
            </div>
          )}
    </div>
  );

  return (
    <div
      className={`flex max-h-[140px] items-center gap-2 overflow-hidden bg-white px-6 pt-5 text-gray-800 ${
        hasDelta ? 'pb-6' : 'pb-3'
      }`}
    >
      {body || defaultContent}
    </div>
  );
};

export default NumberChart;