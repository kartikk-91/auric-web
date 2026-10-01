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
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">{value}</h3>
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
