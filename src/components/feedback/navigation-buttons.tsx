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
    <div className="flex flex-col gap-3 sm:flex-row">

      
      <button
        onClick={onPrev}
        disabled={
          disablePrev ||
          isSubmitting
        }
        className="flex w-full flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
      >
        <ChevronLeft className="h-5 w-5 shrink-0" />

        <span className="truncate">
          Previous
        </span>
      </button>

      
      <button
        onClick={onNext}
        disabled={
          isSubmitting
        }
        className="flex w-full flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-white transition disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
        style={{
          backgroundColor:
            brandColor,
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 shrink-0 animate-spin" />

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
              <ChevronRight className="h-5 w-5 shrink-0" />
            )}
          </>
        )}
      </button>

    </div>
  );
}