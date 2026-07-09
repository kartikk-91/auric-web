"use client";

import { ReactNode } from "react";
import { Menu } from "lucide-react";

interface PageHeaderProps {
  /** Main heading, e.g. "Feedback Form Builder" */
  title: string;
  /** One-line supporting copy under the title */
  subtitle?: string;
  /**
   * Small leading visual — a logo image, a lucide icon, whatever fits.
   * Rendered inside a consistent 9x9 rounded frame. Omit for pages with no icon.
   */
  icon?: ReactNode;
  /** Pass a handler to show the mobile "open sidebar" button (xl:hidden) */
  onOpenSidebar?: () => void;
  /** Right-aligned buttons/controls, e.g. a Publish or Share button */
  actions?: ReactNode;
  /** Show the thin animated progress bar under the header (e.g. while publishing) */
  progress?: boolean;
}

/**
 * Single source of truth for every top-level page header.
 * Layout/spacing is based on the feedback form builder header, which had the
 * strongest baseline of the three. Icon, sidebar toggle, subtitle, and actions
 * are all optional slots so this covers the "form builder", "dashboard", and
 * "Ask Auric" headers without any page re-implementing the chrome.
 */
export default function PageHeader({
  title,
  subtitle,
  icon,
  onOpenSidebar,
  actions,
  progress = false,
}: PageHeaderProps) {
  return (
    <header className="w-full shrink-0 border-b border-gray-100 bg-white">
      <div className="px-4 py-3.5 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            {onOpenSidebar && (
              <button
                onClick={onOpenSidebar}
                className="shrink-0 rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 active:scale-95 xl:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>
            )}

            {icon && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
                {icon}
              </div>
            )}

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 max-w-2xl truncate text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex items-center gap-2 sm:gap-3">{actions}</div>
          )}
        </div>
      </div>

      {progress && (
        <div className="h-0.5 w-full overflow-hidden bg-blue-50">
          <div className="h-full animate-[header-progress_2s_ease-in-out_infinite] bg-blue-400" />
          <style>{`
            @keyframes header-progress {
              0% { width: 0%; margin-left: 0%; }
              50% { width: 75%; margin-left: 10%; }
              100% { width: 0%; margin-left: 100%; }
            }
          `}</style>
        </div>
      )}
    </header>
  );
}