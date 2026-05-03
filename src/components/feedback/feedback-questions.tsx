'use client'

import { useState } from 'react'
import Timeline from './timeline'
import Image from 'next/image'

const FeedbackQuestions = ({
  schema,
  answers,
  setAnswers,
  onSubmit,
}: {
  schema: any
  answers: any[]
  setAnswers: (val: any[]) => void
  onSubmit: () => void
}) => {

  const questions = schema?.fields || []
  const [step, setStep] = useState(0)

  const current = questions[step]

  const getAnswer = () => {
    return answers.find((a) => a.id === current.id)?.answer
  }

  const handleAnswer = (value: any) => {
    const entry = {
      id: current.id,
      question: current.question,
      type: current.type,
      answer: value,
    }

    const filtered = answers.filter((q) => q.id !== current.id)
    setAnswers([...filtered, entry])
  }

  const handleNext = () => {
    if (current?.required && !getAnswer()) return

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      onSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Timeline currentStep={3} />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex justify-center mb-6">
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

        <h2 className="text-xl font-semibold text-center mb-6">
          {current?.question}
        </h2>

        <div className="w-full max-w-md">

          {current?.type === "short-answer" && (
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={getAnswer() || ""}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}

          {current?.type === "long-answer" && (
            <textarea
              className="w-full border rounded px-4 py-2"
              rows={4}
              value={getAnswer() || ""}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}

        </div>

        <div className="flex gap-4 mt-8">
          {step > 0 && <button onClick={handleBack}>Back</button>}

          <button onClick={handleNext}>
            {step === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default FeedbackQuestions