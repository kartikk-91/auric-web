export default function CheckboxesField({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string[]
  onChange: (val: string[]) => void
}) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="space-y-2.5">
      {options.map((option, index) => {
        const isSelected = value.includes(option)

        return (
          <button
            key={index}
            type="button"
            onClick={() => toggleOption(option)}
            aria-pressed={isSelected}
            className={`flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all duration-150 active:scale-[0.99] sm:p-4
              ${
                isSelected
                  ? 'border-purple-600 bg-purple-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors
                ${isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-300 bg-white'}`}
            >
              {isSelected && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            <span className="text-sm font-medium text-gray-900 sm:text-base">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
