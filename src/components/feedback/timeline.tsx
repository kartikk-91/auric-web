import React from 'react'

const Timeline = ({
  currentStep = 1,
}: {
  currentStep?: number
}) => {
  const steps = [
    {
      full: 'Verify Identity',
      short: 'Verify',
    },
    {
      full: 'Personal Details',
      short: 'Details',
    },
    {
      full: 'Your Feedback',
      short: 'Feedback',
    },
  ]

  return (
    <>
      
      <div className="mb-6 flex items-center justify-center md:hidden pl-4">
        <div className="flex w-full max-w-xs items-start justify-between">
          {steps.map(
            (step, index) => {
              const stepNumber =
                index + 1

              const isActive =
                stepNumber <=
                currentStep

              return (
                <React.Fragment
                  key={index}
                >
                  <div className="flex flex-col items-center min-w-0">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors
                      ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {stepNumber}
                    </div>

                    <span
                      className={`mt-2 text-center text-xs font-medium whitespace-nowrap
                      ${
                        isActive
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {
                        step.short
                      }
                    </span>
                  </div>

                  {index <
                    steps.length -
                      1 && (
                    <div className="flex flex-1 items-center px-2 pt-4">
                      <div
                        className={`h-[2px] w-full border-t-2 border-dashed
                        ${
                          stepNumber <
                          currentStep
                            ? 'border-blue-600'
                            : 'border-gray-300'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            }
          )}
        </div>
      </div>

      
      <div className="mb-8 hidden items-center justify-center gap-2 md:flex">
        {steps.map(
          (step, index) => {
            const stepNumber =
              index + 1

            const isActive =
              stepNumber <=
              currentStep

            return (
              <React.Fragment
                key={index}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold
                    ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {stepNumber}
                  </div>

                  <span
                    className={`text-sm font-medium whitespace-nowrap
                    ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.full}
                  </span>
                </div>

                {index <
                  steps.length -
                    1 && (
                  <div
                    className={`mt-[-24px] w-16 border-t-2 border-dashed
                    ${
                      stepNumber <
                      currentStep
                        ? 'border-blue-600'
                        : 'border-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            )
          }
        )}
      </div>
    </>
  )
}

export default Timeline