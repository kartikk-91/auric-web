import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export default function FeedbackFormPreview() {
  return (
    <div className="relative max-w-md overflow-hidden rounded-[28px] border border-white/40 bg-white/85 p-6 shadow-2xl shadow-blue-100/20 backdrop-blur-xl">
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/40 pointer-events-none" />

      <div className="relative">
        
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Live Preview
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Feedback
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Your feedback helps us improve the experience.
          </p>
        </div>

        <div className="space-y-4">
          
          <div className="rounded-2xl border border-blue-100/60 bg-white/70 p-4 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              How satisfied are you?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  aria-label={`Rate ${rating} stars`}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/60 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Star className="h-4 w-4 text-blue-600 transition-all duration-300 group-hover:fill-white group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              What do you like most?
            </label>

            <textarea
              rows={2}
              placeholder="Tell us what stood out..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              What could we improve?
            </label>

            <textarea
              rows={2}
              placeholder="Share suggestions..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
          <p className="text-xs text-gray-500">
            Takes less than 2 min
          </p>

          <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}