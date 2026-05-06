import StarRating from "./star-rating";

export default function TestimonialCard({ testimonial }:any) {
  const { quote, name, title, avatar, rating } = testimonial;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
  
      <div className="mb-3">
        <svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20V12.667C0 5.556 4.148 1.185 12.444 0l1.334 2C10.074 2.963 8.074 4.963 7.556 8H12V20H0ZM16 20V12.667C16 5.556 20.148 1.185 28.444 0l1.334 2C25.963 2.963 24.074 4.963 23.556 8H28V20H16Z"
            fill="#6366F1"
            fillOpacity="0.25"
          />
        </svg>
      </div>


      <p className="text-sm text-gray-700 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>

 
      <div className="flex items-center gap-3 mt-4">
        <img
          src={avatar}
          alt={name}
          className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">{name}</p>
          <p className="text-xs text-gray-400 leading-tight">{title}</p>
        </div>
      </div>

      <StarRating rating={rating} />
    </div>
  );
}