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
    <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">

      
      <button
        onClick={onPrev}
        disabled={
          disablePrev ||
          isSubmitting
        }
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
      >
        <ChevronLeft className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

        <span className="truncate">
          Previous
        </span>
      </button>

      
      <button
        onClick={onNext}
        disabled={
          isSubmitting
        }
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
        style={{
          backgroundColor:
            brandColor,
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin sm:h-5 sm:w-5" />

            <span className="truncate">
              Submitting...
            </span>
          </>
        ) : (
          <>
            <span className="truncate">
              {isLast
                ? "Submit"
                : "Next"}
            </span>

            {!isLast && (
              <ChevronRight className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            )}
          </>
        )}
      </button>

    </div>
  );
}