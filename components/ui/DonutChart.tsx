import React from 'react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartData[];
  centerLabel?: string;
  centerValue?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, centerLabel, centerValue }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let accumulatedPercentage = 0;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
      return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {/* Background circle - Darker shade for better visibility on slate-800 card */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#334155" 
            strokeWidth="10"
          />
          {data.map((segment, index) => {
            const percentage = segment.value / total;
            const dashArray = percentage * circumference;
            // Subtract a tiny amount to create a small visual gap if desired, or keep exact
            const dashOffset = -accumulatedPercentage * circumference;
            accumulatedPercentage += percentage;

            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={segment.color}
                strokeWidth="10"
                strokeDasharray={`${dashArray} ${circumference}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt" 
                className="transition-all duration-1000 ease-out hover:opacity-80"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
           {centerLabel && <span className="text-xs text-slate-400 font-medium mb-1">{centerLabel}</span>}
           {centerValue && <span className="text-lg sm:text-xl font-bold text-slate-100 break-all line-clamp-2">{centerValue}</span>}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-slate-300">
               {item.name} <span className="text-slate-500 text-xs">({Math.round((item.value / total) * 100)}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};