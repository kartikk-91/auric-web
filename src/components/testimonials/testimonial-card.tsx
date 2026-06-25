import StarRating from "./star-rating";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
};

export default function TestimonialCard({
  testimonial,
  variant = "card",
}: {
  testimonial: Testimonial;
  variant?: "card" | "list";
}) {
  const { quote, name, title, avatar, rating } = testimonial;

  if (variant === "list") {
    return (
      <div className="group flex flex-col sm:flex-row sm:items-start gap-4 rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="h-11 w-11 shrink-0 rounded-full bg-gray-100 object-cover"
        />

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <span className="text-gray-300">·</span>
            <p className="text-xs text-gray-400">{title}</p>
          </div>
          <StarRating rating={rating} />
          <p className="mt-2 text-sm leading-6 text-gray-700">&ldquo;{quote}&rdquo;</p>
        </div>
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className="group flex h-full min-h-[220px] flex-col rounded-[24px] border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
      {/* Quote mark */}
      <div className="mb-4 shrink-0">
        <svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          <path
            d="M0 20V12.667C0 5.556 4.148 1.185 12.444 0l1.334 2C10.074 2.963 8.074 4.963 7.556 8H12V20H0ZM16 20V12.667C16 5.556 20.148 1.185 28.444 0l1.334 2C25.963 2.963 24.074 4.963 23.556 8H28V20H16Z"
            fill="#6366F1"
            fillOpacity="0.25"
          />
        </svg>
      </div>

      {/* Quote */}
      <p className="flex-1 text-sm leading-7 text-gray-700 sm:text-[15px]">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="h-10 w-10 shrink-0 rounded-full bg-gray-100 object-cover sm:h-11 sm:w-11"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
          <p className="truncate text-xs text-gray-400 sm:text-sm">{title}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <StarRating rating={rating} />
      </div>
    </div>
  );
}