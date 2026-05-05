import { SUGGESTED_QUESTIONS } from "@/lib/data";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 py-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Try asking
      </p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}