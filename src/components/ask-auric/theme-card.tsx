import { FeedbackTheme } from "@/lib/data";

interface ThemeCardProps {
  theme: FeedbackTheme;
  index: number;
}

export default function ThemeCard({
  theme,
  index,
}: ThemeCardProps) {
  return (
    <div
      className="animate-fade-in border-b border-gray-100 py-3 last:border-0"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-start gap-3">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base ${theme.color}`}
        >
          {theme.icon}
        </div>


        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">
                {theme.title}
              </p>

              <p className="mt-0.5 text-xs leading-relaxed text-gray-500 wrap-break-word sm:line-clamp-1">
                {theme.description}
              </p>
            </div>


            <div className="flex items-end justify-between sm:block sm:text-right shrink-0">
              <p className="text-sm sm:text-base font-bold text-gray-800">
                {theme.percentage}%
              </p>

              <p className="text-[11px] sm:text-xs text-gray-400">
                {theme.count} feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}