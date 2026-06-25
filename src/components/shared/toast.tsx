"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const show = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss after 4s
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-start gap-3 rounded-2xl border px-5 py-4 shadow-2xl transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      } ${
        type === "success"
          ? "border-green-100 bg-white"
          : "border-red-100 bg-white"
      }`}
      style={{ minWidth: 280, maxWidth: 380 }}
    >
      <div className="mt-0.5 shrink-0">
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {type === "success" ? "Published successfully" : "Failed to publish"}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{message}</p>
      </div>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="shrink-0 rounded-md p-0.5 text-gray-400 transition hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl ${
          type === "success" ? "bg-green-400" : "bg-red-400"
        }`}
        style={{
          animation: "shrink 4s linear forwards",
        }}
      />

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}