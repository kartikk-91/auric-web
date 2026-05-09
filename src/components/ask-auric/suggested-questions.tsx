import { SUGGESTED_QUESTIONS } from "@/lib/data";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({
  onSelect,
}: SuggestedQuestionsProps) {
  return (
    <div className="px-4 sm:px-5 py-4">
      <div className="mx-auto w-full">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Try asking
        </p>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map(
            (q) => (
              <button
                key={q}
                onClick={() =>
                  onSelect(q)
                }
                className="
                  rounded-full
                  border border-blue-200
                  bg-blue-50
                  px-3 py-2
                  text-xs sm:text-sm
                  text-blue-600
                  transition-colors
                  hover:border-blue-300
                  hover:bg-blue-100
                  active:scale-[0.98]
                  text-left
                  max-w-full
                  wrap-break-word
                "
              >
                {q}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}