"use client";

import { useState } from "react";
import { Share2, Copy, Check, X, Link2 } from "lucide-react";
import { useDashboard } from "@/providers/dashboard-provider";

export default function DashboardHeader() {
  const { dashboardData } = useDashboard();

  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const formUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${dashboardData.formLink}`
      : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const shareOptions = [
    {
      label: "WhatsApp",
      image: "/icons/whatsapp.png",
      href: `https://wa.me/?text=${encodeURIComponent(formUrl)}`,
      bg: "bg-white border border-gray-200",
    },
    {
      label: "Email",
      image: "/icons/mail.png",
      href: `mailto:?subject=${encodeURIComponent(
        "Take a look at this form"
      )}&body=${encodeURIComponent(formUrl)}`,
      bg: "bg-white border border-gray-200 text-black",
    },
    {
      label: "X",
      image: "/icons/x.png",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        formUrl
      )}`,
      bg: "bg-white border border-gray-200",
    },
  ];

  return (
    <header className="w-full border-b border-gray-100 bg-white px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:pt-4 lg:pb-5">
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
          <button
            onClick={() => setShowShare(true)}
            className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0 active:scale-[0.98] sm:w-auto"
          >
            <Share2 className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
            Share Form
          </button>
        </div>
      </div>

      {showShare && (
        <>
          <div
            className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setShowShare(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white shadow-2xl animate-in zoom-in-95 fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Share2 className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Share Form
                  </h3>
                </div>
                <button
                  onClick={() => setShowShare(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition duration-200 hover:rotate-90 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-5 py-5">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Form Link
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-1.5 py-1.5 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                  <Link2 className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <input
                    readOnly
                    value={formUrl}
                    onFocus={(e) => e.target.select()}
                    className="w-full truncate bg-transparent text-sm text-gray-600 outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className={`flex h-8 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-all duration-200 ${
                      copied
                        ? "bg-green-50 text-green-600"
                        : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
                    Or share via
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="flex items-center justify-center gap-4">
                  {shareOptions.map((option) => (
                    <a
                      key={option.label}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2"
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md group-active:scale-95 ${option.bg}`}
                      >
                        {option.image && (
                          <img
                            src={option.image}
                            alt={option.label}
                            className="h-8 w-8 object-contain"
                          />
                        )}
                      </span>
                      <span className="text-xs font-medium text-gray-500 transition group-hover:text-gray-800">
                        {option.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}