import { Star } from "lucide-react";

export default function FieldPreview({ field }: any) {
  const baseInput =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  switch (field.type) {
    case "short-answer":
      return (
        <input
          type="text"
          placeholder="Type your answer..."
          className={baseInput}
        />
      );

    case "long-answer":
      return (
        <textarea
          rows={3}
          placeholder="Type your answer..."
          className={`${baseInput} resize-none`}
        />
      );

    case "rating":
      return (
        <div className="flex items-center gap-2">
          {Array.from({ length: field.ratingScale || 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-6 h-6 text-blue-500 cursor-pointer hover:scale-110 transition"
            />
          ))}
        </div>
      );

    case "multiple-choice":
      return (
        <div className="space-y-2">
          {(field.options || ["Option 1", "Option 2"]).map(
            (opt: string, i: number) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <input type="radio" name={field.id} />
                {opt}
              </label>
            )
          )}
        </div>
      );

    case "checkboxes":
      return (
        <div className="space-y-2">
          {(field.options || ["Option 1", "Option 2"]).map(
            (opt: string, i: number) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                {opt}
              </label>
            )
          )}
        </div>
      );

    case "dropdown":
      return (
        <select className={baseInput}>
          <option>Select an option</option>
          {(field.options || ["Option 1", "Option 2"]).map(
            (opt: string, i: number) => (
              <option key={i}>{opt}</option>
            )
          )}
        </select>
      );

    case "email":
      return (
        <input
          type="email"
          placeholder="email@example.com"
          className={baseInput}
        />
      );

    case "phone":
      return (
        <input
          type="tel"
          placeholder="+91 98765 43210"
          className={baseInput}
        />
      );

    case "website":
      return (
        <input
          type="url"
          placeholder="https://example.com"
          className={baseInput}
        />
      );

    case "date":
      return <input type="date" className={baseInput} />;

    case "nps":
      return (
        <div className="space-y-2">
          <div className="flex gap-1">
            {Array.from({ length: 11 }).map((_, i) => (
              <button
                key={i}
                className="flex-1 py-2 text-sm border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-400 transition"
              >
                {i}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Not likely</span>
            <span>Extremely likely</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}