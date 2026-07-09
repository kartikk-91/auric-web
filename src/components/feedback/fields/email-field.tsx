export default function EmailField({
  value,
  onChange,
  placeholder,
}: {
  value?: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
      </svg>

      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'your.email@example.com'}
        className="w-full rounded-xl border-2 border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 sm:py-4"
      />
    </div>
  )
}
