"use client";

export default function PublishModal({
  onClose,
}: any) {
  const publishLink =
    "https://yourwebsite.com/testimonials";

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(
        publishLink
      );
    } catch (err) {
      console.error(
        "Copy failed:",
        err
      );
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[32px] bg-white shadow-2xl animate-in slide-in-from-bottom duration-300 sm:max-h-none sm:max-w-md sm:rounded-[28px]">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
            />
          </svg>
        </button>


        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>


        <div className="overflow-y-auto px-5 pb-6 pt-5 sm:p-8">
          <div className="flex flex-col items-center text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>


            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Wall Published!
            </h3>


            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
              Your testimonial wall is
              live. Share the link
              below with your audience.
            </p>


            <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1 rounded-xl bg-white px-3 py-3 text-left text-xs text-gray-500 border border-gray-200">
                  <p className="truncate">
                    {publishLink}
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                  Copy Link
                </button>
              </div>
            </div>


            <button
              onClick={onClose}
              className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}