export default function NPSField({
  value,
  onChange,
}: {
  value?: number
  onChange: (val: number) => void
}) {
  const nums = Array.from({ length: 11 }, (_, i) => i)

  return (
    <div>
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11 sm:gap-2">
        {nums.map((num) => {
          const isSelected = value === num

          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              aria-pressed={isSelected}
              className={`aspect-square rounded-lg border-2 text-sm font-semibold transition-all duration-150 active:scale-95 sm:text-base
                ${
                  isSelected
                    ? 'border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-200'
                    : 'border-gray-200 text-gray-600 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
            >
              {num}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex justify-between text-xs font-medium text-gray-400 sm:text-sm">
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  )
}
