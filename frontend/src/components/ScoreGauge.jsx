import React from 'react';

export const ScoreGauge = ({ score = 0, size = 'md', showLabel = true }) => {
  const normalized = Math.max(0, Math.min(100, score || 0));

  let colorClass = 'text-emerald-500 stroke-emerald-500';
  let bgClass = 'text-emerald-50 bg-emerald-50 text-emerald-700 border-emerald-200';
  let badgeText = 'Excellent Match';

  if (normalized < 60) {
    colorClass = 'text-rose-500 stroke-rose-500';
    bgClass = 'text-rose-50 bg-rose-50 text-rose-700 border-rose-200';
    badgeText = 'Needs Optimization';
  } else if (normalized < 75) {
    colorClass = 'text-amber-500 stroke-amber-500';
    bgClass = 'text-amber-50 bg-amber-50 text-amber-700 border-amber-200';
    badgeText = 'Good Baseline';
  } else if (normalized < 88) {
    colorClass = 'text-blue-500 stroke-blue-500';
    bgClass = 'text-blue-50 bg-blue-50 text-blue-700 border-blue-200';
    badgeText = 'Strong Match';
  }

  const radius = size === 'sm' ? 24 : size === 'lg' ? 48 : 36;
  const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg width={svgSize} height={svgSize} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className="stroke-slate-100 fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            className={`fill-none transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-black tracking-tight text-slate-900 ${
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-3xl' : 'text-xl'
          }`}>
            {normalized}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold -mt-1">/100</span>
        </div>
      </div>

      {showLabel && (
        <span className={`mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bgClass}`}>
          {badgeText}
        </span>
      )}
    </div>
  );
};
