export default function DateField({
  value,
  onChange,
}: {
  value?: string
  onChange: (val: string) => void
}) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 5.25h15A1.5 1.5 0 0121 6.75v13.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20.25V6.75a1.5 1.5 0 011.5-1.5z" />
      </svg>

      <input
        type="date"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all focus:border-purple-600 focus:ring-4 focus:ring-purple-100 sm:py-4"
      />
    </div>
  )
}
