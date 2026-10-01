"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
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
      <header className="border-b border-slate-200 bg-white">
        <div className="px-4 py-3.5 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <div className="min-w-0">
                  <h1 className="truncate text-xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-2xl">
                    Feedback Form Builder
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm text-slate-500">
                    Design a focused feedback experience for your customers.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-12px_rgba(37,99,235,0.75)] transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:h-10 sm:px-5"
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
            </div>
          </div>
        </div>

        
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
