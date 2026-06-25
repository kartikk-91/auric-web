"use client";

import { useMemo, useState, useEffect } from "react";
import TestimonialCard from "./testimonial-card";

export default function TestimonialWall({
  config,
  testimonials,
  previewMode = "desktop",
}: {
  config: any;
  testimonials: any[];
  previewMode?: "desktop" | "mobile";
}) {
  const {
    heading,
    tagline,
    ctaText,
    ctaLink,
    cardsPerView,
    layoutStyle,
  } = config;

  const safeTestimonials = testimonials?.length ? testimonials : [];
  const perPage = Number(cardsPerView) || 3;
  const totalPages = Math.ceil(safeTestimonials.length / perPage);

  const [page, setPage] = useState(0);

  // Reset page when perPage changes
  useEffect(() => {
    setPage(0);
  }, [perPage]);

  const visible = safeTestimonials.slice(page * perPage, page * perPage + perPage);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const isMobile = previewMode === "mobile";

  // ── Grid columns ───────────────────────────────────────────────────────────
  const colClass = useMemo(() => {
    if (isMobile || layoutStyle === "List Style") return "grid-cols-1";
    if (perPage === 1) return "grid-cols-1";
    if (perPage === 2) return "grid-cols-1 md:grid-cols-2";
    if (perPage === 4) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  }, [perPage, isMobile, layoutStyle]);

  // ── Masonry layout ─────────────────────────────────────────────────────────
  const isMasonry = layoutStyle === "Masonry" && !isMobile;

  // For masonry: distribute visible items into 2 or 3 columns
  const masonryColumns = useMemo(() => {
    if (!isMasonry) return [];
    const cols = perPage >= 4 ? 3 : perPage >= 2 ? 2 : 1;
    const columns: any[][] = Array.from({ length: cols }, () => []);
    visible.forEach((t, i) => columns[i % cols].push(t));
    return columns;
  }, [isMasonry, visible, perPage]);

  // ── List layout card ───────────────────────────────────────────────────────
  const isList = layoutStyle === "List Style" || isMobile;

  return (
    <div className="flex min-h-[420px] flex-col items-center rounded-[28px] border border-gray-100 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Heading */}
      <h2 className="max-w-3xl text-center text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {heading || "What our customers say"}
      </h2>

      {/* Tagline */}
      {tagline && (
        <p className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
          {tagline}
        </p>
      )}

      {/* CTA */}
      {ctaText && (
        <a
          href={ctaLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          <span>{ctaText}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      )}

      {/* Testimonials grid */}
      <div className="mt-8 w-full">
        {isMasonry ? (
          // Masonry layout
          <div
            className={`flex gap-4 lg:gap-5 items-start`}
            style={{ columnCount: masonryColumns.length }}
          >
            {masonryColumns.map((col, ci) => (
              <div key={ci} className="flex flex-1 flex-col gap-4 lg:gap-5">
                {col.map((t: any) => (
                  <TestimonialCard
                    key={t.id}
                    testimonial={t}
                    variant={isList ? "list" : "card"}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Grid / list layout
          <div className={`grid w-full gap-4 lg:gap-5 ${colClass}`}>
            {visible.map((t: any) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                variant={isList ? "list" : "card"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-7 flex items-center gap-3">
          <button
            onClick={prev}
            disabled={page === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-5 bg-indigo-600"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Page counter */}
      {totalPages > 1 && (
        <p className="mt-2 text-xs text-gray-400">
          Page {page + 1} of {totalPages} · {safeTestimonials.length} testimonials
        </p>
      )}
    </div>
  );
}