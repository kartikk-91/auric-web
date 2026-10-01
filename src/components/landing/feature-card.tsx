import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBgColor: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBgColor,
}: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden bg-white p-7 transition-colors hover:bg-slate-50">
      
      <div className="relative flex h-full flex-col">
        
        <div
          className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${iconBgColor}`}
        >
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </h3>

          <p className="text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-8 pt-2">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:gap-3">
            Learn more

            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
