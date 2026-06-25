"use client";

// ─── InputField ──────────────────────────────────────────────────────────────

export function InputField({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  placeholder?: string;
  hint?: string;
}) {
  const count = value?.length || 0;
  const nearLimit = maxLength && count >= maxLength * 0.85;

  return (
    <div className="mb-5">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-800">{label}</label>
        {maxLength && (
          <span
            className={`text-[11px] transition-colors ${
              nearLimit ? "text-orange-400" : "text-gray-400"
            }`}
          >
            {count}/{maxLength}
          </span>
        )}
      </div>
      {hint && <p className="mb-2 text-xs leading-relaxed text-gray-400">{hint}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

// ─── TextareaField ────────────────────────────────────────────────────────────

export function TextareaField({
  label,
  description,
  value,
  onChange,
  maxLength,
  placeholder,
}: {
  label: string;
  description?: string;
  value: string;
  onChange: (val: string) => void;
  maxLength?: number;
  placeholder?: string;
}) {
  const count = value?.length || 0;
  const nearLimit = maxLength && count >= maxLength * 0.85;

  return (
    <div className="mb-5">
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-800">{label}</label>
        {maxLength && (
          <span
            className={`text-[11px] transition-colors ${
              nearLimit ? "text-orange-400" : "text-gray-400"
            }`}
          >
            {count}/{maxLength}
          </span>
        )}
      </div>
      {description && (
        <p className="mb-2 text-xs leading-relaxed text-gray-400">{description}</p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

// ─── LinkField ────────────────────────────────────────────────────────────────

export function LinkField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const isValid =
    value === "" ||
    value.startsWith("https://") ||
    value.startsWith("http://");

  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-sm font-semibold text-gray-800">{label}</label>
      <div
        className={`flex items-center overflow-hidden rounded-xl border transition focus-within:border-transparent focus-within:ring-2 focus-within:ring-indigo-400 ${
          !isValid && value ? "border-red-300" : "border-gray-200"
        }`}
      >
        <span className="pl-3 pr-2 text-gray-400 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-2.5 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      {!isValid && value && (
        <p className="mt-1 text-xs text-red-400">Please enter a valid URL starting with http:// or https://</p>
      )}
    </div>
  );
}

// ─── SelectField ──────────────────────────────────────────────────────────────

export function SelectField({
  label,
  description,
  value,
  onChange,
  options,
}: {
  label: string;
  description?: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  icon?: string;
}) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-gray-400">{description}</p>
          )}
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:min-w-[130px]"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LayoutPickerField ────────────────────────────────────────────────────────

type LayoutOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const layoutIcons: Record<string, React.ReactNode> = {
  "Card Style": (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-6">
      <rect x="1" y="1" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="1" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="25" y="1" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "List Style": (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-6">
      <rect x="1" y="1" width="34" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="34" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="17" width="34" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "Masonry": (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-6">
      <rect x="1" y="1" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="1" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="25" y="1" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="17" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="12" width="10" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export function LayoutPickerField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <p className="mb-3 text-sm font-semibold text-gray-800">Layout Style</p>
      <p className="mb-3 text-xs text-gray-400">Choose how testimonials are arranged.</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition ${
                isActive
                  ? "border-indigo-400 bg-indigo-50 text-indigo-600 shadow-sm"
                  : "border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600"
              }`}
            >
              {layoutIcons[opt.value] ?? (
                <span className="h-6 w-9 rounded bg-gray-200" />
              )}
              <span className="text-[11px] font-semibold leading-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── CardsPerViewField ────────────────────────────────────────────────────────

export function CardsPerViewField({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const options = [1, 2, 3, 4];

  return (
    <div className="py-4">
      <p className="mb-1 text-sm font-semibold text-gray-800">Cards Per View</p>
      <p className="mb-3 text-xs text-gray-400">Number of testimonial cards visible at once.</p>
      <div className="flex gap-2">
        {options.map((n) => {
          const isActive = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition ${
                isActive
                  ? "border-indigo-400 bg-indigo-50 text-indigo-600 shadow-sm"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}