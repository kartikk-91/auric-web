"use client";

import { useState } from "react";
import { Eye, Send, MoreHorizontal, Loader2 } from "lucide-react";
import { Toast, ToastType } from "../shared/toast";

interface ToastState {
  message: string;
  type: ToastType;
}

export default function FormBuilderHeader({
  form,
  title,
  tagline,
  onPublishStart,
  onPublishEnd,
}: any) {
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const handlePublish = async () => {
    setPublishing(true);
    onPublishStart?.();

    try {
      const res = await fetch("/api/form/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          tagLine: tagline,
          schema: {
            fields: form.fields,
            settings: {},
          },
        }),
      });

      if (!res.ok) throw new Error("Server error");

      await res.json();

      setToast({
        type: "success",
        message: "Your form is live and ready to collect responses.",
      });
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setPublishing(false);
      onPublishEnd?.();
    }
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="px-4 py-3.5 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Left: Branding */}
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <div className="min-w-0">
                  <h1 className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
                    Feedback Form Builder
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Create and customize
                    forms to collect
                    valuable feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="flex h-9 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:h-10 sm:px-5"
              >
                {publishing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Publishing…</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Publish</span>
                  </>
                )}
              </button>

              <button
                disabled={publishing}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Publish progress bar */}
        {publishing && (
          <div className="h-0.5 w-full overflow-hidden bg-blue-50">
            <div className="h-full animate-[progress_2s_ease-in-out_infinite] bg-blue-400" />
            <style>{`
              @keyframes progress {
                0% { width: 0%; margin-left: 0%; }
                50% { width: 75%; margin-left: 10%; }
                100% { width: 0%; margin-left: 100%; }
              }
            `}</style>
          </div>
        )}
      </header>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}