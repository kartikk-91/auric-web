"use client";

export default function Header({
  onPublish,
}: any) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-5">

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Testimonial Wall Builder
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a beautiful testimonial wall and
            share it anywhere.
          </p>
        </div>


        <button
          onClick={onPublish}
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-indigo-700 active:scale-[0.98] active:bg-indigo-800 sm:w-auto sm:px-5 sm:py-2.5"
        >
          <span>Publish Wall</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line
              x1="10"
              y1="14"
              x2="21"
              y2="3"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}