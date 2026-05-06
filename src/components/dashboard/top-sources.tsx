'use client';

export default function TopSources() {
  const sources = [
    { name: 'Website Form', value: 42, percentage: 33, color: '#3b82f6' }, // blue
    { name: 'Google Review', value: 28, percentage: 22, color: '#22c55e' }, // green
    { name: 'Intercom', value: 20, percentage: 16, color: '#a855f7' }, // purple
    { name: 'Email', value: 18, percentage: 14, color: '#eab308' }, // yellow
    { name: 'Others', value: 20, percentage: 15, color: '#ec4899' }, // pink
  ];

  const total = sources.reduce((sum, s) => sum + s.value, 0);
  let currentAngle = -90; 
  const segments = sources.map((source) => {
    const angle = (source.value / total) * 360;
    const segment = {
      ...source,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    };
    currentAngle += angle;
    return segment;
  });
  const createDonutPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const start = polarToCartesian(50, 50, outerRadius, endAngle);
    const end = polarToCartesian(50, 50, outerRadius, startAngle);
    const innerStart = polarToCartesian(50, 50, innerRadius, endAngle);
    const innerEnd = polarToCartesian(50, 50, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M ${start.x} ${start.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
      'Z',
    ].join(' ');
  };

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-900">Top Sources</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>

      <div className="flex items-center gap-8">
<div className="relative shrink-0">
          <svg width="180" height="180" viewBox="0 0 100 100">
            {segments.map((segment, idx) => (
              <path
                key={idx}
                d={createDonutPath(segment.startAngle, segment.endAngle, 45, 30)}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>
<div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
<div className="flex-1 space-y-3">
          {sources.map((source, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-gray-700">{source.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {source.value} ({source.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}