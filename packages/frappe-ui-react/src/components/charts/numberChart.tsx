import React from "react";

import { formatValue } from "./helpers";
import type { NumberChartConfig } from "./types";

interface RenderPropHelpers {
  formatValue: typeof formatValue;
}

export interface NumberChartProps {
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
      return isDeltaPositive ? "text-ink-red-3" : "text-green-500";
    }
    return isDeltaPositive ? "text-ink-green-2" : "text-ink-red-3";
  };

  const defaultContent = (
    <div className="flex w-full flex-col">
      {title || (
        <span className="truncate text-sm font-medium text-ink-gray-5">
          {config.title}
        </span>
      )}

      {subtitle ? (
        subtitle({ formatValue })
      ) : (
        <div className="flex-1 flex-shrink-0 truncate text-[24px] font-semibold leading-10 text-ink-gray-6">
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
              <span>{isDeltaPositive ? "↑" : "↓"}</span>
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
      className={`flex max-h-[140px] items-center gap-2 overflow-hidden bg-surface-gray-1 px-6 pt-5 text-ink-gray-8 ${
        hasDelta ? "pb-6" : "pb-3"
      }`}
    >
      {body || defaultContent}
    </div>
  );
};

export default NumberChart;
