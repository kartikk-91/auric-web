import {
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function NavigationButtons({
  onPrev,
  onNext,
  isLast,
  disablePrev,
  brandColor,
  isSubmitting = false,
}: any) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onPrev}
        disabled={
          disablePrev ||
          isSubmitting
        }
        className="flex-1 py-3.5 px-6 rounded-xl border-2 border-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      <button
        onClick={onNext}
        disabled={
          isSubmitting
        }
        className="flex-1 py-3.5 px-6 rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
        style={{
          backgroundColor:
            brandColor,
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            {isLast
              ? "Submit"
              : "Next"}

            {!isLast && (
              <ChevronRight />
            )}
          </>
        )}
      </button>
    </div>
  );
}