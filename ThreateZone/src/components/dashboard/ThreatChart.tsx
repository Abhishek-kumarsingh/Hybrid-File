import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ThreatsByType, ThreatsBySeverity } from '../../types';
import { useTheme } from '../theme/ThemeProvider';

interface ThreatChartProps {
  data: ThreatsByType[] | ThreatsBySeverity[];
  dataKey: string;
  nameKey: string;
  title: string;
  className?: string;
}

const ThreatChart: React.FC<ThreatChartProps> = ({
  data,
  dataKey,
  nameKey,
  title,
  className = ''
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const getBarColor = (entry: any) => {
    if (!entry) return isDarkMode ? '#38bdf8' : '#0ea5e9';

    if (nameKey === 'severity') {
      const severity = entry[nameKey] || entry.payload?.[nameKey];
      switch (severity) {
        case 'critical':
          return isDarkMode ? '#f87171' : '#ef4444';
        case 'high':
          return isDarkMode ? '#fbbf24' : '#f59e0b';
        case 'medium':
          return isDarkMode ? '#38bdf8' : '#0ea5e9';
        case 'low':
          return isDarkMode ? '#4ade80' : '#22c55e';
        default:
          return isDarkMode ? '#9ca3af' : '#6b7280';
      }
    }
    return isDarkMode ? '#38bdf8' : '#0ea5e9';
  };

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-medium text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              stroke={isDarkMode ? '#374151' : '#e5e7eb'}
            />
            <XAxis
              dataKey={nameKey}
              tick={{ fontSize: 12, fill: isDarkMode ? '#d1d5db' : '#4b5563' }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
              stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
            />
            <YAxis
              tick={{ fill: isDarkMode ? '#d1d5db' : '#4b5563' }}
              stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
            />
            <Tooltip
              formatter={(value: number) => [`${value} threats`, 'Count']}
              labelFormatter={(label) => `${label}`}
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
            <Bar
              dataKey={dataKey}
              name="Threat Count"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
              barSize={nameKey === 'severity' ? 40 : 20}
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatChart;