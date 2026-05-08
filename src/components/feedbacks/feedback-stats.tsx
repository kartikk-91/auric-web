

import { Feedback } from "@/types/feedback";


interface FeedbackStatsProps {
  data: Feedback[];
}

export default function FeedbackStats({ data }: FeedbackStatsProps) {
  const totalFeedback = data.length;
  const positive = data.filter(f => f.sentiment === 'Positive').length;
  const neutral = data.filter(f => f.sentiment === 'Neutral').length;
  const negative = data.filter(f => f.sentiment === 'Negative').length;

  const positivePercent = Math.round((positive / totalFeedback) * 100);
  const neutralPercent = Math.round((neutral / totalFeedback) * 100);
  const negativePercent = Math.round((negative / totalFeedback) * 100);

  const stats = [
    {
      label: 'Total Feedback',
      value: totalFeedback,
      change: '+18%',
      changePositive: true,
      icon: (
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      )
    },
    {
      label: 'Positive',
      value: `${positivePercent}%`,
      change: '+8%',
      changePositive: true,
      icon: (
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    },
    {
      label: 'Neutral',
      value: `${neutralPercent}%`,
      change: '-3%',
      changePositive: false,
      icon: (
        <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </div>
      )
    },
    {
      label: 'Negative',
      value: `${negativePercent}%`,
      change: '-5%',
      changePositive: false,
      icon: (
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
          <p className={`text-sm ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`}>
            {stat.change} vs Apr 12 - May 11
          </p>
        </div>
      ))}
    </div>
  );
}