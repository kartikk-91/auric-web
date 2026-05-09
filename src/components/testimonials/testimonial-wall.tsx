"use client";

import { useMemo, useState } from "react";
import TestimonialCard from "./testimonial-card";

export default function TestimonialWall({
  config,
  testimonials,
  previewMode = "desktop",
}: any) {
  const {
    heading,
    tagline,
    ctaText,
    ctaLink,
    cardsPerView,
  } = config;


  const safeTestimonials =
    testimonials?.length
      ? testimonials
      : [];

  const perPage =
    Number(cardsPerView) || 3;

  const totalPages = Math.ceil(
    safeTestimonials.length / perPage
  );

  const [page, setPage] =
    useState(0);

  const visible =
    safeTestimonials.slice(
      page * perPage,
      page * perPage + perPage
    );

  const prev = () =>
    setPage((p: number) =>
      Math.max(0, p - 1)
    );

  const next = () =>
    setPage((p: number) =>
      Math.min(
        totalPages - 1,
        p + 1
      )
    );


  const colClass = useMemo(() => {

    if (
      previewMode === "mobile"
    ) {
      return "grid-cols-1";
    }


    if (perPage === 1)
      return "grid-cols-1";

    if (perPage === 2)
      return "grid-cols-1 md:grid-cols-2";

    if (perPage === 4)
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";

    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  }, [perPage, previewMode]);

  return (
    <div className="flex min-h-[420px] flex-col items-center rounded-[28px] border border-gray-100 bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      <h2 className="max-w-3xl text-center text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {heading ||
          "What our customers say"}
      </h2>


      {tagline && (
        <p className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
          {tagline}
        </p>
      )}


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
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      )}


      <div
        className={`mt-8 grid w-full gap-4 lg:gap-5 ${colClass}`}
      >
        {visible.map((t: any) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
          />
        ))}
      </div>


      {totalPages > 1 && (
        <div className="mt-7 flex items-center gap-3">

          <button
            onClick={prev}
            disabled={page === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
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


          <div className="flex items-center gap-2">
            {Array.from({
              length: totalPages,
            }).map((_, i) => (
              <button
                key={i}
                onClick={() =>
                  setPage(i)
                }
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
            disabled={
              page ===
              totalPages - 1
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
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
    </div>
  );
}