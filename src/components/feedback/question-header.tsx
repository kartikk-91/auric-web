export default function QuestionHeader({
  question,
  subtext,
  brandName,
  brandColor,
  required,
}: any) {
  return (
    <div className="mb-5">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 leading-snug">
        {brandName
          ? question.split(brandName).map((part: string, i: number, arr: any[]) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{ color: brandColor }}>{brandName}</span>
                )}
              </span>
            ))
          : question}
        {required && (
          <span className="ml-1 align-super text-sm font-medium" style={{ color: brandColor }}>
            *
          </span>
        )}
      </h2>

      {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
    </div>
  )
}