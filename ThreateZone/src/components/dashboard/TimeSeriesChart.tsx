import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TimeSeriesData } from '../../types';
import { useTheme } from '../theme/ThemeProvider';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title: string;
  className?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, title, className = '' }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Define colors based on theme
  const lineColor = isDarkMode ? '#38bdf8' : '#0ea5e9';
  const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
  const textColor = isDarkMode ? '#d1d5db' : '#4b5563';
  const axisColor = isDarkMode ? '#6b7280' : '#9ca3af';

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-medium text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
            />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12, fill: textColor }}
              interval="preserveStartEnd"
              stroke={axisColor}
            />
            <YAxis
              tick={{ fill: textColor }}
              stroke={axisColor}
            />
            <Tooltip
              formatter={(value: number) => [`${value}`, 'Value']}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                color: isDarkMode ? '#f9fafb' : '#111827'
              }}
              itemStyle={{ color: isDarkMode ? '#f9fafb' : '#111827' }}
              labelStyle={{ color: isDarkMode ? '#f9fafb' : '#111827' }}
            />
            <Legend
              wrapperStyle={{ color: isDarkMode ? '#f9fafb' : '#111827' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Alert Level"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 3, fill: lineColor, stroke: lineColor }}
              activeDot={{ r: 5, fill: lineColor, stroke: isDarkMode ? '#1f2937' : '#ffffff' }}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;