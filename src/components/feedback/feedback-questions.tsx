'use client'

import Timeline from './timeline'
import Image from 'next/image'
import MultiStepForm from './multistep-form'

const FeedbackQuestions = ({
  schema,
  company,
  title,
  tagLine,
  onSubmit,
  isSubmitting,
}: {
  schema: any
  company?: {
    cname: string
    logoUrl?: string | null
  } | null
  title?: string | null
  tagLine?: string | null
  onSubmit: (data: any) => void
  isSubmitting?: boolean
}) => {
  const fields = schema?.fields || []
  const brandName = company?.cname || 'this company'

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <Timeline currentStep={3} />

      <div className="flex flex-1 flex-col items-center px-1 sm:px-2 md:px-6">
        <div className="mb-3 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:h-16 sm:w-16">
            {company?.logoUrl ? (
              <Image
                src={company.logoUrl}
                width={64}
                height={64}
                alt={brandName}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-lg font-semibold text-purple-600">
                {brandName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <h1 className="mb-1 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          {title || brandName}
        </h1>

        {tagLine && (
          <p className="mb-4 max-w-md text-center text-sm text-gray-500">
            {tagLine}
          </p>
        )}

        {!tagLine && <div className="mb-4" />}

        <div
          className={
            isSubmitting
              ? 'flex w-full flex-1 flex-col pointer-events-none opacity-70 transition'
              : 'flex w-full flex-1 flex-col transition'
          }
        >
          <MultiStepForm
            fields={fields}
            brandName={brandName}
            brandColor="#7c3aed"
            isSubmitting={isSubmitting}
            onSubmit={(responses: any) => {
              const formatted = fields.map((field: any) => ({
                id: field.id,
                question: field.question,
                type: field.type,
                answer: responses[field.id],
              }))

              onSubmit(formatted)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FeedbackQuestions