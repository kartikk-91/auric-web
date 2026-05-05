import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

export default function StatCard({ title, value, change, icon, iconBgColor }: StatCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  );
}