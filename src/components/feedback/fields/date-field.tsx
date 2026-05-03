export default function DateField({ value, onChange }: { value?: string; onChange: (val: string) => void }) {
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-900"
    />
  );
}
