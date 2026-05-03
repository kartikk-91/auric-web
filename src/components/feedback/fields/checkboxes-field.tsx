export default function CheckboxesField({ options, value, onChange }: { options: string[]; value: string[]; onChange: (val: string[]) => void }) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => toggleOption(option)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            value.includes(option)
              ? 'border-purple-600 bg-purple-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              value.includes(option) ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
            }`}>
              {value.includes(option) && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="font-medium text-gray-900">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
}