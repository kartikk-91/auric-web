export default function PhoneField({
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.438l-4.144-1.184a1.5 1.5 0 00-1.549.44l-.842 1.01a11.25 11.25 0 01-6.34-6.34l1.01-.84a1.5 1.5 0 00.44-1.55L7.36 3.328a1.5 1.5 0 00-1.438-1.077H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>

      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '+1 (555) 123-4567'}
        className="w-full rounded-xl border-2 border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 sm:py-4"
      />
    </div>
  )
}
