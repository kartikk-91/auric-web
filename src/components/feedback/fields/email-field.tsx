export default function EmailField({ value, onChange, placeholder }: { value?: string; onChange: (val: string) => void; placeholder?: string }) {
  return (
    <input
      type="email"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'your.email@example.com'}
      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
    />
  );
}
