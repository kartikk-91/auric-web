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
  onSubmit: (
    data: any
  ) => void
  isSubmitting?: boolean
}) => {
  const fields =
    schema?.fields || []

  return (
    <div className="flex h-full min-h-fit w-full flex-col">

      <Timeline currentStep={3} />

      <div className="flex flex-1 flex-col items-center px-1 sm:px-2 md:px-6">

        
        <div className="mb-2 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm sm:h-16 sm:w-16">
            <Image
              src="/emblem-transparent.png"
              width={32}
              height={32}
              alt="Auric"
              className="object-contain"
            />
          </div>
        </div>

        
        <h1 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Auric Technologies
        </h1>

        
        <div
          className={
            isSubmitting
              ? 'w-full transition pointer-events-none opacity-70'
              : 'w-full transition'
          }
        >
          <MultiStepForm
            fields={fields}
            brandName="Auric Technologies"
            brandColor="#7c3aed"
            isSubmitting={isSubmitting}
            onSubmit={(
              responses: any
            ) => {
              const formatted =
                fields.map(
                  (
                    field: any
                  ) => ({
                    id: field.id,
                    question:
                      field.question,
                    type:
                      field.type,
                    answer:
                      responses[
                        field.id
                      ],
                  })
                )

              onSubmit(
                formatted
              )
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default FeedbackQuestions