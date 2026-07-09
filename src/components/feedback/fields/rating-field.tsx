export default function RatingField({ value, onChange }: any) {
  const ratings = [
    { value: 1, emoji: "😞", label: "Very poor", color: "#ef4444", bg: "#fff5f5", darkBg: "#2d1010" },
    { value: 2, emoji: "😕", label: "Poor",      color: "#f97316", bg: "#fff7f0", darkBg: "#2d1a0a" },
    { value: 3, emoji: "😐", label: "Neutral",   color: "#eab308", bg: "#fefce8", darkBg: "#2a2508" },
    { value: 4, emoji: "🙂", label: "Good",      color: "#84cc16", bg: "#f7fee7", darkBg: "#1a2808" },
    { value: 5, emoji: "😊", label: "Excellent", color: "#22c55e", bg: "#f0fdf4", darkBg: "#0d2a14" },
  ];

  return (
    <div className="flex gap-2">
      {ratings.map((r) => {
        const isSelected = value === r.value;
        return (
          <button
            key={r.value}
            onClick={() => onChange(r.value)}
            style={isSelected ? { borderColor: r.color, background: r.bg, borderWidth: "1.5px" } : {}}
            className={`
              flex flex-1 basis-0 flex-col items-center justify-center gap-1 sm:gap-2 px-1 py-2.5 sm:px-2 sm:py-3
              min-h-[64px] sm:min-h-0
              bg-white border border-gray-200 rounded-xl cursor-pointer
              transition-all duration-150
              hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50
              active:scale-95
            `}
          >
            <span
              className="text-lg leading-none transition-transform duration-150"
              style={{ transform: isSelected ? "scale(1.2)" : undefined }}
            >
              {r.emoji}
            </span>

            <span className="hidden sm:block text-[11px] font-medium text-gray-400 text-center whitespace-nowrap">
              {r.label}
            </span>

            <span
              className="w-1.5 h-1.5 rounded-full transition-opacity duration-150 mt-0.5"
              style={{
                background: r.color,
                opacity: isSelected ? 1 : 0,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}