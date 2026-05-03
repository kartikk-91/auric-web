export default function ProgressBar({
  current,
  total,
  brandColor,
}: {
  current: number;
  total: number;
  brandColor: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-sm text-center font-medium mb-6" style={{ color: brandColor }}>
        Question {current + 1} of {total}
      </p>

      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{
              backgroundColor: i <= current ? brandColor : "#e5e7eb",
            }}
          />
        ))}
      </div>
    </div>
  );
}