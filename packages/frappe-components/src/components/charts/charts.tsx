import React, { useRef, useEffect } from 'react';
import { init, type ECharts } from 'echarts';
import { debounce } from '../../utils/debounce';
import type { ChartsWrapperProps } from './types';


const ChartsWrapper: React.FC<ChartsWrapperProps> = ({
  options,
  events,
  error,
}) => {
  
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current){
        return;
    }

    chartInstance.current = init(chartRef.current, 'light', { renderer: 'svg' });

    if (events?.click) {
      chartInstance.current.on('click', events.click);
    }

    const resizeDebounce = debounce(() => {
      chartInstance.current?.resize({
        animation: {
          duration: 300,
        },
      });
    }, 250);

    const resizeObserver = new ResizeObserver(resizeDebounce);
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, [events]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(options, true);
    }
  }, [options]);

  return (
    <>
      {error ? (
        <div className="flex h-full w-full items-center justify-center text-center text-red-500">
          Error: {error}
        </div>
      ) : (
        <div
          ref={chartRef}
          className="h-full w-full min-w-[300px] min-h-[300px] px-4 py-2 md:min-w-[400px]"
        />
      )}
    </>
  );
};

export default ChartsWrapper;