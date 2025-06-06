import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts/types/component/Tooltip';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ChevronDown } from 'lucide-react';

// Define chart data type to ensure type-safety for chart datasets
type ChartData = { name: string; value: number };

// Custom tooltip for better user readability and styling
const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
        <p className="text-gray-700 font-medium text-sm">{label}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-[#9CBCF8]"></div>
          <p className="text-gray-900 font-semibold">{payload[0].value}</p>
        </div>
      </div>
    );
  }
  return null;
};

const PerformanceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly' | 'Yearly'>('Weekly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Using constants to avoid repeating chart labels and values for DRYness
  const dataMap: Record<'Weekly' | 'Monthly' | 'Yearly', ChartData[]> = {
    Weekly: [
      { name: 'Monday', value: 58 },
      { name: 'Tuesday', value: 42 },
      { name: 'Wednesday', value: 78 },
      { name: 'Thursday', value: 68 },
      { name: 'Friday', value: 55 },
      { name: 'Saturday', value: 38 },
      { name: 'Sunday', value: 72 }
    ],
    Monthly: [
      { name: 'Week 1', value: 65 },
      { name: 'Week 2', value: 72 },
      { name: 'Week 3', value: 58 },
      { name: 'Week 4', value: 84 }
    ],
    Yearly: [
      { name: 'Q1', value: 68 },
      { name: 'Q2', value: 75 },
      { name: 'Q3', value: 62 },
      { name: 'Q4', value: 81 }
    ]
  };

  // Dynamically switch dataset based on selected timeframe
  const currentData = dataMap[timeframe];

  return (
<>
      {/* Chart title and dropdown for timeframe selection — gives user control */}
      <div className="flex justify-between items-center p-4 pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Performance Report</h2>

        {/* Dropdown UI toggle — lets user pick timeframe */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-black/15 rounded-full hover:bg-white transition-all duration-200 shadow-sm"
          >
            <span className="text-gray-700 font-medium text-sm">{timeframe}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Shows options based on current selection — improved UX */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {['Weekly', 'Monthly', 'Yearly'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setTimeframe(option as 'Weekly' | 'Monthly' | 'Yearly');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-150 text-sm first:rounded-t-lg last:rounded-b-lg ${timeframe === option ? 'bg-[#9CBCF8]/20 text-[#9CBCF8] font-medium' : 'text-gray-700'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart section — visualizes the dataset with smooth UX */}
      <div className="px-4 pb-4">
        {/* Set fixed height for proper rendering on smaller screens — fixes some responsive issues */}
        <div className="w-full" style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentData}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 20
              }}
            >
              {/* Gradient for area fill — improves visual aesthetics */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9CBCF8" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#9CBCF8" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              {/* Grid lines — improves readability */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff"
                strokeOpacity={0.7}
                vertical={false}
              />

              {/* X-axis config — custom ticks and styling for clarity */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#4B5563',
                  fontSize: 12,
                  fontWeight: 500
                }}
                dy={10}
              />

              {/* Y-axis config — limited to [0, 100] for consistency */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#4B5563',
                  fontSize: 12,
                  fontWeight: 500
                }}
                domain={[0, 100]}
                width={35}
              />

              {/* Tooltip — custom design for better UX */}
              <Tooltip content={<CustomTooltip />} />

              {/* Area shape — monotone type for smooth flow, dots for clarity */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#9CBCF8"
                strokeWidth={3}
                fill="url(#areaGradient)"
                dot={{
                  fill: '#9CBCF8',
                  strokeWidth: 2,
                  stroke: '#fff',
                  r: 4
                }}
                activeDot={{
                  r: 6,
                  stroke: '#fff',
                  strokeWidth: 2,
                  fill: '#9CBCF8'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
</>
  );
};

export default PerformanceChart;
