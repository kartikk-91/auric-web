export default function DropdownField({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[]
  value?: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white p-4 pr-11 font-medium text-gray-900 outline-none transition-all focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
      >
        <option value="" disabled>
          {placeholder || 'Select an option'}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
