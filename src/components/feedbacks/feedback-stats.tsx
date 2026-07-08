interface FeedbackStatsData {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

interface FeedbackStatsProps {
  data: FeedbackStatsData;
}

export default function FeedbackStats({
  data,
}: FeedbackStatsProps) {
  const totalFeedback = data.total;
  const { positive, neutral, negative } = data;

  const positivePercent = totalFeedback
    ? Math.round(
        (positive / totalFeedback) * 100
      )
    : 0;

  const neutralPercent = totalFeedback
    ? Math.round(
        (neutral / totalFeedback) * 100
      )
    : 0;

  const negativePercent = totalFeedback
    ? Math.round(
        (negative / totalFeedback) * 100
      )
    : 0;

  const stats = [
    {
      label: "Total Feedback",
      value: totalFeedback,
      subtitle: "Customer responses",
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      ),
    },
    {
      label: "Positive",
      value: `${positivePercent}%`,
      subtitle: `${positive} positive responses`,
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
    },
    {
      label: "Neutral",
      value: `${neutralPercent}%`,
      subtitle: `${neutral} neutral responses`,
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15a3 3 0 100-6 3 3 0 000 6zm0 0v5m0-18V4m8 8h-2M6 12H4"
            />
          </svg>
        </div>
      ),
    },
    {
      label: "Negative",
      value: `${negativePercent}%`,
      subtitle: `${negative} negative responses`,
      icon: (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
              <p className="text-sm text-gray-600 mb-1 truncate">
                {stat.label}
              </p>

              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>

            {stat.icon}
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            {stat.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}