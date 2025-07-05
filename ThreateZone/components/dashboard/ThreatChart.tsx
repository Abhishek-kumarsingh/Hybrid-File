import React from 'react';

interface ThreatChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  nameKey: string;
  title?: string;
  className?: string;
}

const ThreatChart: React.FC<ThreatChartProps> = ({ 
  data, 
  dataKey, 
  nameKey, 
  title = 'Threat Chart',
  className = '' 
}) => {
  // Calculate chart dimensions
  const width = 400;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 60, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Find max value for scaling
  const maxValue = Math.max(...data.map(d => d[dataKey]));
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length * 0.2;

  // Color scheme for different threat types/severities
  const getBarColor = (index: number, name: string) => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--secondary))',
      'hsl(var(--success))',
      'hsl(var(--warning))',
      'hsl(var(--danger))',
      'hsl(220, 70%, 50%)',
      'hsl(280, 70%, 50%)',
    ];

    // Special colors for severity levels
    if (name.toLowerCase().includes('critical')) return 'hsl(var(--danger))';
    if (name.toLowerCase().includes('high')) return 'hsl(var(--warning))';
    if (name.toLowerCase().includes('medium')) return 'hsl(var(--primary))';
    if (name.toLowerCase().includes('low')) return 'hsl(var(--success))';

    return colors[index % colors.length];
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

            {/* Bars */}
            {data.map((item, index) => {
              const barHeight = (item[dataKey] / maxValue) * chartHeight;
              const x = index * (barWidth + barSpacing) + barSpacing / 2;
              const y = chartHeight - barHeight;
              
              return (
                <g key={index}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={getBarColor(index, item[nameKey])}
                    className="transition-all duration-300 hover:opacity-80"
                    rx="2"
                  >
                    <title>{`${item[nameKey]}: ${item[dataKey]}`}</title>
                  </rect>
                  
                  {/* Value labels on top of bars */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    className="text-xs fill-foreground font-medium"
                  >
                    {item[dataKey]}
                  </text>
                </g>
              );
            })}

            {/* Y-axis labels */}
            <g className="y-axis">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const value = Math.round(maxValue * (1 - ratio));
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
              {data.map((item, index) => {
                const x = index * (barWidth + barSpacing) + barSpacing / 2 + barWidth / 2;
                const label = item[nameKey];
                const truncatedLabel = label.length > 10 ? label.substring(0, 10) + '...' : label;
                
                return (
                  <text
                    key={index}
                    x={x}
                    y={chartHeight + 15}
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                    transform={`rotate(-45, ${x}, ${chartHeight + 15})`}
                  >
                    {truncatedLabel}
                  </text>
                );
              })}
            </g>
          </g>
        </svg>

        {/* Summary stats */}
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>Total: {data.reduce((sum, item) => sum + item[dataKey], 0)}</span>
          <span>Max: {maxValue}</span>
          <span>Items: {data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ThreatChart;
