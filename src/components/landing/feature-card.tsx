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
    <div className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-blue-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        
        <div
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h3>

          <p className="text-sm leading-7 text-gray-600">
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