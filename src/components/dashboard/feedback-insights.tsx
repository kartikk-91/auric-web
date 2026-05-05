import { Info, ChevronRight, Smile, Clock, Heart } from 'lucide-react';

interface InsightItem {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  percentage: string;
}

export default function FeedbackInsights() {
  const insights: InsightItem[] = [
    {
      icon: <Smile className="w-5 h-5 text-green-600" />,
      iconBgColor: 'bg-green-50',
      title: 'Ease of use',
      description: 'Most users love how simple and intuitive Auric is.',
      percentage: '24% of feedback',
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      iconBgColor: 'bg-blue-50',
      title: 'Saves time',
      description: 'Users highlight time savings in collecting and managing testimonials.',
      percentage: '18% of feedback',
    },
    {
      icon: <Heart className="w-5 h-5 text-purple-600" />,
      iconBgColor: 'bg-purple-50',
      title: 'Great support',
      description: 'Fast and helpful support leaves a strong impression.',
      percentage: '14% of feedback',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">Feedback Insights</h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className={`p-2.5 rounded-lg ${insight.iconBgColor} shrink-0`}>
              {insight.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                {insight.title}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                {insight.description}
              </p>
              <p className="text-xs text-gray-500">
                {insight.percentage}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 group-hover:text-gray-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}