"use client";

import { useState } from "react";
import TestimonialCard from "./testimonial-card";

export default function TestimonialWall({ config, testimonials }:any) {
  const { heading, tagline, ctaText, ctaLink, cardsPerView } = config;
  const perPage = Number(cardsPerView) || 3;

  const totalPages = Math.ceil(testimonials.length / perPage);
  const [page, setPage] = useState(0);

  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const colClass =
    perPage === 1
      ? "grid-cols-1"
      : perPage === 2
      ? "grid-cols-2"
      : perPage === 4
      ? "grid-cols-4"
      : "grid-cols-3";

  return (
    <div className="rounded-2xl border border-gray-100 bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 px-8 py-10 min-h-[420px] flex flex-col items-center">

      <h2 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight leading-snug max-w-xl">
        {heading || "What our customers say"}
      </h2>

    
      <p className="mt-2 text-gray-500 text-center text-sm max-w-md">
        {tagline}
      </p>

 
      {ctaText && (
        <a
          href={ctaLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow transition-colors duration-150"
        >
          {ctaText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
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


      <div className={`mt-8 grid ${colClass} gap-4 w-full`}>
        {visible.map((t:any) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>


      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={prev}
          disabled={page === 0}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === page ? "bg-indigo-600 w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={page === totalPages - 1}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}