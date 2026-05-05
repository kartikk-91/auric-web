
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationButtons({
  onPrev,
  onNext,
  isLast,
  disablePrev,
  brandColor,
}: any) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="flex-1 py-3.5 px-6 rounded-xl border-2 border-gray-200 text-gray-700 disabled:opacity-40 flex items-center justify-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      <button
        onClick={onNext}
        className="flex-1 py-3.5 px-6 rounded-xl text-white flex items-center justify-center gap-2"
        style={{ backgroundColor: brandColor }}
      >
        {isLast ? "Submit" : "Next"}
        {!isLast && <ChevronRight />}
      </button>
    </div>
  );
}