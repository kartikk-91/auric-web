export default function MultipleChoiceField({
  options,
  value,
  onChange,
}: {
  options: string[]
  value?: string
  onChange: (val: string) => void
}) {
  return (
    <div className="space-y-2.5">
      {options.map((option, index) => {
        const isSelected = value === option

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isSelected}
            className={`flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all duration-150 active:scale-[0.99] sm:p-4
              ${
                isSelected
                  ? 'border-purple-600 bg-purple-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
                ${isSelected ? 'border-purple-600' : 'border-gray-300'}`}
            >
              {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-purple-600" />}
            </div>

            <span className="text-sm font-medium text-gray-900 sm:text-base">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
