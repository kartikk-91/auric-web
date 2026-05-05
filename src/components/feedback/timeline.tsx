import React from 'react'

const Timeline = ({ currentStep = 1 }) => {
    const steps = [
        "Verify Identity",
        "Personal Details",
        "Your Feedback"
    ]

    return (
        <div className="flex justify-center items-center mb-8 gap-2">
            {steps.map((label, index) => {
                const stepNumber = index + 1
                const isActive = stepNumber <= currentStep

                return (
                    <React.Fragment key={index}>
<div className="flex flex-col items-center">
                            <div className={`w-6 h-6 text-sm rounded-full flex items-center justify-center font-semibold mb-2
                                ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                {stepNumber}
                            </div>
                            <span className={`text-sm font-medium
                                ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                {label}
                            </span>
                        </div>
{index < steps.length - 1 && (
                            <div className={`w-16 border-t-2 border-dashed mt-[-24px]
                                ${stepNumber < currentStep ? 'border-blue-600' : 'border-gray-300'}`}>
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default Timeline