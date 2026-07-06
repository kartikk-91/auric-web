"use client";

import { Star } from "lucide-react";
import { useDashboard } from "@/providers/dashboard-provider";

interface Testimonial {
  author: string;
  quote: string;
  rating: number;
  location: string;
  date: string;
}

const MAX_TESTIMONIALS = 3;
const MAX_STARS = 5;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const filled = Math.min(MAX_STARS, Math.max(0, Math.round(safeRating)));

  return (
    <div className="flex shrink-0 gap-0.5">
      {Array.from({ length: MAX_STARS }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < filled
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function RecentTestimonials() {
  const { dashboardData } = useDashboard();

  const testimonials: Testimonial[] = (
    dashboardData?.recentTestimonials || []
  ).slice(0, MAX_TESTIMONIALS);

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h3 className="text-sm font-semibold text-gray-900">
          Recent Testimonials
        </h3>

        <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 sm:text-sm">
          View all
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="flex gap-3 sm:gap-4">
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-purple-500 text-sm font-semibold text-white sm:h-12 sm:w-12 sm:text-base">
                {getInitials(testimonial.author)}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-3 line-clamp-4 sm:line-clamp-2 md:line-clamp-4 xl:line-clamp-2 text-sm leading-relaxed text-gray-700">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {testimonial.author}
                  </p>

                  <p className="truncate text-xs leading-relaxed text-gray-500">
                    {testimonial.location}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <StarRating rating={testimonial.rating} />

                  <span className="shrink-0 text-xs text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}