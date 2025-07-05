import React from 'react';
import { TimeSeriesData } from '@/types';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title?: string;
  className?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  data, 
  title = 'Time Series Chart',
  className = '' 
}) => {
  // Calculate chart dimensions
  const width = 400;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Find min and max values
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;

  // Create path for the line chart
  const createPath = () => {
    if (data.length === 0) return '';

    const points = data.map((d, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((d.value - minValue) / valueRange) * chartHeight;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  // Create area path
  const createAreaPath = () => {
    if (data.length === 0) return '';

    const points = data.map((d, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((d.value - minValue) / valueRange) * chartHeight;
      return `${x},${y}`;
    });

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const lastX = lastPoint.split(',')[0];

    return `M ${firstPoint} L ${points.join(' L ')} L ${lastX},${chartHeight} L 0,${chartHeight} Z`;
  };

  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-48 text-muted-foreground ${className}`}>
        No data available
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-medium mb-4 text-foreground">{title}</h3>
      )}
      
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid lines */}
            <g className="grid">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1={0}
                  y1={chartHeight * ratio}
                  x2={chartWidth}
                  y2={chartHeight * ratio}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
            </g>

            {/* Area */}
            <path
              d={createAreaPath()}
              fill="url(#areaGradient)"
              className="transition-all duration-300"
            />

            {/* Line */}
            <path
              d={createPath()}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              className="transition-all duration-300"
            />

            {/* Data points */}
            {data.map((d, index) => {
              const x = (index / (data.length - 1)) * chartWidth;
              const y = chartHeight - ((d.value - minValue) / valueRange) * chartHeight;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="hsl(var(--primary))"
                  className="transition-all duration-300 hover:r-4"
                >
                  <title>{`${d.timestamp}: ${d.value}`}</title>
                </circle>
              );
            })}

            {/* Y-axis labels */}
            <g className="y-axis">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const value = Math.round(minValue + (valueRange * (1 - ratio)));
                return (
                  <text
                    key={ratio}
                    x={-10}
                    y={chartHeight * ratio + 4}
                    textAnchor="end"
                    className="text-xs fill-muted-foreground"
                  >
                    {value}
                  </text>
                );
              })}
            </g>

            {/* X-axis labels */}
            <g className="x-axis">
              {data.filter((_, index) => index % Math.ceil(data.length / 6) === 0).map((d, index, filteredData) => {
                const originalIndex = data.findIndex(item => item.timestamp === d.timestamp);
                const x = (originalIndex / (data.length - 1)) * chartWidth;
                
                return (
                  <text
                    key={originalIndex}
                    x={x}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                  >
                    {d.timestamp}
                  </text>
                );
              })}
            </g>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <span>Min: {minValue}</span>
          <span>Max: {maxValue}</span>
          <span>Avg: {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
