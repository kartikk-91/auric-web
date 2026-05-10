'use client'

import Timeline from './timeline'
import Image from 'next/image'
import MultiStepForm from './multistep-form'

const FeedbackQuestions = ({
  schema,
  onSubmit,
  isSubmitting,
}: {
  schema: any
  onSubmit: (data: any) => void
  isSubmitting?: boolean
}) => {
  const fields = schema?.fields || []

  return (
    <div className="w-full h-full min-h-fit flex flex-col">
      <Timeline currentStep={3} />

      <div className="flex-1 flex flex-col items-center px-6">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white border border-gray-200 shadow-sm">
            <Image
              src="/emblem-transparent.png"
              width={32}
              height={32}
              alt="Auric"
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Auric Technologies
        </h1>

        <div
          className={
            isSubmitting
              ? "w-full pointer-events-none opacity-70 transition"
              : "w-full transition"
          }
        >
          <MultiStepForm
            fields={fields}
            brandName="Auric Technologies"
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