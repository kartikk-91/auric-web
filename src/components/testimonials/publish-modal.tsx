"use client";

export default function PublishModal({ onClose }:any) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Wall Published!
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Your testimonial wall is live. Share the link below with your audience.
          </p>

          <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="text-xs text-gray-500 truncate flex-1">
              https://yourwebsite.com/testimonials
            </span>
            <button
              className="text-indigo-600 text-xs font-semibold hover:underline shrink-0"
              onClick={() => navigator.clipboard?.writeText("https://yourwebsite.com/testimonials")}
            >
              Copy
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-sm transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}