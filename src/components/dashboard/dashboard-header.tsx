import { Eye, Send } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="w-full border-b border-gray-100 bg-white px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:pt-8 lg:pb-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-gray-400 sm:text-[15px]">
            Welcome back, Kartik! Here's what's happening with your feedbacks.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center lg:justify-end">
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto">
            <Eye className="h-5 w-5 text-gray-500" />
            Copy Form Link
          </button>

          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto">
            <Send className="h-5 w-5" />
            Share Wall
          </button>
        </div>
      </div>
    </header>
  );
}