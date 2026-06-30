const SUGGESTED_QUESTIONS = [
  "What are the major customer pain points?",
  "How has sentiment changed this month?",
  "Which product features get the most praise?",
  "Show me feedback trends from Delhi",
  "What topics appear most in negative reviews?",
  "Summarise last week's feedback",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 sm:px-5 py-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        Try asking
      </p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="
              rounded-full border border-blue-200 bg-blue-50
              px-3 py-1.5 text-xs text-blue-600 text-left
              transition-all duration-150
              hover:border-blue-300 hover:bg-blue-100
              active:scale-[0.97]
              max-w-full break-words
            "
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}