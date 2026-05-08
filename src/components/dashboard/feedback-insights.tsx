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
      icon: <Smile className="h-5 w-5 text-green-600" />,
      iconBgColor: 'bg-green-50',
      title: 'Ease of use',
      description: 'Most users love how simple and intuitive Auric is.',
      percentage: '24% of feedback',
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      iconBgColor: 'bg-blue-50',
      title: 'Saves time',
      description:
        'Users highlight time savings in collecting and managing testimonials.',
      percentage: '18% of feedback',
    },
    {
      icon: <Heart className="h-5 w-5 text-purple-600" />,
      iconBgColor: 'bg-purple-50',
      title: 'Great support',
      description:
        'Fast and helpful support leaves a strong impression.',
      percentage: '14% of feedback',
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Feedback Insights
          </h3>

          <Info className="h-4 w-4 text-gray-400" />
        </div>

        <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 sm:text-sm">
          View all
        </button>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50 sm:gap-4 sm:p-4"
          >
            <div
              className={`shrink-0 rounded-lg p-2 sm:p-2.5 ${insight.iconBgColor}`}
            >
              {insight.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-gray-900">
                    {insight.title}
                  </h4>

                  <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {insight.description}
                  </p>

                  <p className="mt-1.5 text-[11px] text-gray-500 sm:text-xs">
                    {insight.percentage}
                  </p>
                </div>

                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-gray-600 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}