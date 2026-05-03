export default function MultipleChoiceField({ options, value, onChange }: { options: string[]; value?: string; onChange: (val: string) => void }) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(option)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            value === option
              ? 'border-purple-600 bg-purple-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              value === option ? 'border-purple-600' : 'border-gray-300'
            }`}>
              {value === option && (
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              )}
            </div>
            <span className="font-medium text-gray-900">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
}