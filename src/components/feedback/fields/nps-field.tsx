export default function NPSField({ value, onChange }: { value?: number; onChange: (val: number) => void }) {
  return (
    <div>
      <div className="grid grid-cols-11 gap-2 mb-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`aspect-square rounded-lg border-2 transition-all font-semibold text-sm sm:text-base ${
              value === num
                ? 'border-purple-600 bg-purple-600 text-white shadow-lg scale-110'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs sm:text-sm text-gray-500">
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  );
}