export default function DropdownField({ options, value, onChange, placeholder }: { options: string[]; value?: string; onChange: (val: string) => void; placeholder?: string }) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-900 font-medium bg-white"
    >
      <option value="" disabled>{placeholder || 'Select an option'}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
}