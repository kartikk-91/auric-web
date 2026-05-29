"use client";

import { useState } from "react";
import { Copy, Share2 } from "lucide-react";
import { useDashboard } from "@/providers/dashboard-provider";

export default function DashboardHeader() {
  const { dashboardData } =
    useDashboard();

  const [copied, setCopied] =
    useState(false);

  const handleCopyForm =
    async () => {
      try {
        const formUrl =
          `${window.location.origin}${dashboardData.formLink}`;

        await navigator.clipboard.writeText(
          formUrl
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (error) {
        console.error(
          "Copy failed:",
          error
        );
      }
    };

  const handleOpenWall =
    () => {
      const wallUrl =
        `${window.location.origin}${dashboardData.wallLink}`;

      window.open(
        wallUrl,
        "_blank"
      );
    };

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
          <button
            onClick={
              handleCopyForm
            }
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
          >
            <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />

            {copied
              ? "Copied!"
              : "Copy Form Link"}
          </button>

          <button
            onClick={
              handleOpenWall
            }
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition-all hover:bg-blue-700 sm:w-auto"
          >
            <Share2 className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            Share Wall
          </button>
        </div>
      </div>
    </header>
  );
}