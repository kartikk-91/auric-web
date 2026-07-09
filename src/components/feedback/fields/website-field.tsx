export default function WebsiteField({
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c-1.657 0-3-4.03-3-9s1.343-9 3-9 3 4.03 3 9-1.343 9-3 9zM3.6 9h16.8M3.6 15h16.8" />
      </svg>

      <input
        type="url"
        inputMode="url"
        autoComplete="url"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'https://example.com'}
        className="w-full rounded-xl border-2 border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 sm:py-4"
      />
    </div>
  )
}
