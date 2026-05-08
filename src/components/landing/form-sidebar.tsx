import React from 'react';
import {
  Star,
  MessageSquare,
  AlignLeft,
  Smile,
  Frown,
  Meh,
} from 'lucide-react';

const formElements = [
  {
    icon: Star,
    label: 'Rating',
  },
  {
    icon: MessageSquare,
    label: 'Text',
  },
  {
    icon: AlignLeft,
    label: 'Long Text',
  },
  {
    icon: Smile,
    label: 'Emoji',
  },
  {
    icon: Frown,
    label: 'Sentiment',
  },
  {
    icon: Meh,
    label: 'Feedback',
  },
];

export default function FormSidebar() {
  return (
    <div className="relative flex flex-col items-center gap-3 rounded-3xl border border-white/40 bg-white/80 p-4 shadow-xl shadow-blue-100/20 backdrop-blur-xl">
      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-50/40 via-transparent to-purple-50/30 pointer-events-none" />

      <div className="relative flex flex-col gap-3">
        {formElements.map((element, index) => (
          <button
            key={index}
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100/50 bg-blue-50/70 text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
          >
            <element.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

            <div className="pointer-events-none absolute left-20 top-1/2 -translate-y-1/2 rounded-xl bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 whitespace-nowrap">
              {element.label}
            </div>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 lg:block">
        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          fill="none"
          className="text-blue-200"
        >
          <path
            d="M5 10C50 20 20 100 75 110"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}