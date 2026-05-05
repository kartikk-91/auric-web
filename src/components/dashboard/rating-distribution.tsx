'use client';

import { Info, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function RatingDistribution() {
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [hovered, setHovered] = useState<number | null>(null);

  const data = [
    { rating: '1★', value: 10 },
    { rating: '2★', value: 16 },
    { rating: '3★', value: 31 },
    { rating: '4★', value: 19 },
    { rating: '5★', value: 19 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  // ✅ Nice rounded ticks
  const step = Math.ceil(maxValue / 4 / 5) * 5;
  const ticks = [0, step, step * 2, step * 3, step * 4];
  const maxTick = ticks[ticks.length - 1];

  // ✅ Chart layout
  const chartHeight = 90; // leave bottom space
  const chartWidth = 100;
  const spacing = chartWidth / data.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 pb-0">
 
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Rating Distribution
          </h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="relative mt-12">
    
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-500">
          {ticks.slice().reverse().map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>

  
        <div className="ml-8 h-56 relative">
          <svg
            viewBox="0 0 100 110"
            className="w-full h-full"
            preserveAspectRatio="none"
          >

            {ticks.map((t, i) => {
              const y = chartHeight - (t / maxTick) * chartHeight;
              return (
                <line
                  key={i}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth="0.5"
                />
              );
            })}

            {/* Gradient */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
              </linearGradient>
            </defs>

       
            {data.map((d, i) => {
              const barWidth = spacing * 0.5;
              const xCenter = spacing * i + spacing / 2;
              const height = (d.value / maxTick) * chartHeight;

              return (
                <rect
                  key={i}
                  x={xCenter - barWidth / 2}
                  y={chartHeight - height}
                  width={barWidth}
                  height={height}
                  rx="3"
                  fill="url(#barGradient)"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`transition-all duration-200 ${
                    hovered === i ? 'opacity-100' : 'opacity-80'
                  }`}
                />
              );
            })}
          </svg>

          {hovered !== null && (
            <div
              className="absolute text-xs bg-gray-900 text-white px-2 py-1 rounded shadow"
              style={{
                left: `${(hovered + 0.5) * (100 / data.length)}%`,
                transform: 'translateX(-50%)',
                top: '0px',
              }}
            >
              {data[hovered].rating}: {data[hovered].value}
            </div>
          )}

        
          <div className="flex mt-2">
            {data.map((d, i) => (
              <div
                key={i}
                className="flex-1 text-center text-xs text-gray-500"
              >
                {d.rating}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}