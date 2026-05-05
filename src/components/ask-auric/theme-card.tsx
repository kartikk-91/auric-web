import { FeedbackTheme } from "@/lib/data";

interface ThemeCardProps {
  theme: FeedbackTheme;
  index: number;
}

export default function ThemeCard({ theme, index }: ThemeCardProps) {
  return (
    <div
      className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
<div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-base ${theme.color}`}>
        {theme.icon}
      </div>
<div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{theme.title}</p>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{theme.description}</p>
      </div>
<div className="text-right shrink-0">
        <p className="text-base font-bold text-gray-800">{theme.percentage}%</p>
        <p className="text-xs text-gray-400">{theme.count} feedback</p>
      </div>
    </div>
  );
}