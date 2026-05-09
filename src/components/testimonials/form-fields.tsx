"use client";

export function InputField({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
}: any) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          maxLength={maxLength}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 px-3 py-3 pr-14 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:py-2.5 sm:pr-16"
        />

        {maxLength && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 sm:text-xs">
            {value?.length || 0}/
            {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export function TextareaField({
  label,
  description,
  value,
  onChange,
  maxLength,
  placeholder,
}: any) {
  return (
    <div className="mb-5">
      <label className="mb-1 block text-sm font-semibold text-gray-800">
        {label}
      </label>

      {description && (
        <p className="mb-2 text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          maxLength={maxLength}
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {maxLength && (
          <span className="absolute bottom-3 right-3 text-[11px] text-gray-400 sm:text-xs">
            {value?.length || 0}/
            {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export function LinkField({
  label,
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
      </label>

      <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 transition focus-within:border-transparent focus-within:ring-2 focus-within:ring-indigo-400">

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
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />


        <span className="hidden pr-3 text-gray-300 sm:block">
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
      </div>
    </div>
  );
}

export function SelectField({
  label,
  description,
  value,
  onChange,
  options,
}: any) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex min-w-0 items-start gap-3">
          {description && (
            <div className="mt-0.5 shrink-0 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                />
              </svg>
            </div>
          )}

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800">
              {label}
            </p>

            {description && (
              <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>


        <div className="relative w-full sm:w-auto">
          <select
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:min-w-[130px]"
          >
            {options.map((opt: any) => (
              <option
                key={opt.value}
                value={opt.value}
              >
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