export default function ShortAnswerField({
  value,
  onChange,
  placeholder,
}: {
  value?: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Type your answer here...'}
      maxLength={500}
      className="w-full rounded-xl border-2 border-gray-200 py-3.5 px-4 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 sm:py-4"
    />
  )
}
