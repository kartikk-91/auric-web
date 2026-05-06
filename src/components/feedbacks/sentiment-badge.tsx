// components/SentimentBadge.tsx
interface SentimentBadgeProps {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export default function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const getStyles = () => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Neutral':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Negative':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getIcon = () => {
    switch (sentiment) {
      case 'Positive':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Neutral':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        );
      case 'Negative':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStyles()}`}>
      {getIcon()}
      {sentiment}
    </span>
  );
}