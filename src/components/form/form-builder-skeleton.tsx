"use client";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-100 ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export function FormBuilderSkeleton() {
  return (
    <div className="relative flex h-[calc(100vh-130px)] overflow-hidden">
      {/* Left sidebar skeleton */}
      <div className="ml-4 mt-3 hidden h-full w-[240px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
        <div className="px-4 py-5">
          <Shimmer className="mb-5 h-4 w-24" />
          <div className="space-y-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                <Shimmer className="h-4 w-4 shrink-0 rounded" />
                <Shimmer className="h-3.5 w-28" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center canvas skeleton */}
      <div className="min-w-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              {/* Header skeleton */}
              <div className="mb-7 space-y-2">
                <Shimmer className="h-6 w-56" />
                <Shimmer className="h-4 w-full max-w-md" />
                <Shimmer className="h-4 w-64" />
              </div>

              {/* Field skeletons */}
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <div className="flex gap-3">
                      <Shimmer className="mt-1 h-5 w-5 shrink-0 rounded" />
                      <div className="flex-1 space-y-3">
                        <Shimmer className="h-4 w-2/3" />
                        <Shimmer className={`h-9 w-full rounded-md`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add field button skeleton */}
              <Shimmer className="mt-5 h-14 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Right settings panel skeleton */}
      <div className="mr-4 mt-3 hidden h-full w-[320px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:block">
        <div className="px-6 py-6">
          <Shimmer className="mb-6 h-4 w-28" />
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Shimmer className="h-3 w-20" />
                <Shimmer className="h-9 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}