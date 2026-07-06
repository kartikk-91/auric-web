"use client";

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export default function ToggleRow({
  label,
  description,
  value,
  onChange,
  disabled,
}: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onChange}
        disabled={disabled}
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          value ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            value ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}