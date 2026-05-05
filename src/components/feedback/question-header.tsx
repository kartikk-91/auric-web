
export default function QuestionHeader({
  question,
  subtext,
  brandName,
  brandColor,
}: any) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl sm:text-xl font-semibold text-gray-900 mb-3">
        {question.split(brandName).map((part: string, i: number, arr: any[]) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span style={{ color: brandColor }}>{brandName}</span>
            )}
          </span>
        ))}
      </h2>

      {subtext && <p className="text-gray-500">{subtext}</p>}
    </div>
  );
}