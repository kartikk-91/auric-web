export default function ProgressBar({
  current,
  total,
  brandColor,
}: {
  current: number
  total: number
  brandColor: string
}) {
  return (
    <div className="mb-6">
      <p
        className="text-xs font-semibold uppercase tracking-wide text-center mb-4"
        style={{ color: brandColor }}
      >
        Question {current + 1} of {total}
      </p>

      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: i <= current ? '100%' : '0%',
                backgroundColor: brandColor,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}